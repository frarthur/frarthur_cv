import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";

const VALID_TABLES = [
  "a_propos", "a_propos_vedette", "parcours", "parcours_experience",
  "parcours_logiciel", "projets", "contact", "galerie", "settings",
];

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, table, action, data, match } = body;

    if (!password || !table || !action) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    if (!VALID_TABLES.includes(table)) {
      return NextResponse.json({ error: "Table invalide" }, { status: 400 });
    }

    const { data: settings } = await supabaseAdmin
      .from("settings")
      .select("value")
      .eq("key", "admin_password")
      .single();

    const storedHash = settings?.value ?? "";

    if (storedHash.length === 64) {
      if (sha256(password) !== storedHash) {
        return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
      }
    } else {
      if (password !== storedHash) {
        return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
      }
      await supabaseAdmin.from("settings").update({ value: sha256(password), updated_at: new Date().toISOString() }).eq("key", "admin_password");
    }

    let result;

    switch (action) {
      case "select": {
        const query = supabaseAdmin.from(table).select("*");
        if (table === "parcours_experience") query.order("type").order("sort_order");
        else if (table !== "parcours" && table !== "contact" && table !== "a_propos" && table !== "settings") {
          query.order("sort_order");
        }
        const { data: rows, error } = await query;
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        result = rows;
        break;
      }

      case "upsert": {
        if (!data) return NextResponse.json({ error: "Donnees requises" }, { status: 400 });
        const entry: Record<string, unknown> = { ...data };
        if (match?.id) entry.id = match.id;
        const { data: upserted, error } = await supabaseAdmin
          .from(table).upsert(entry, { onConflict: "id" }).select().single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        result = upserted;
        break;
      }

      case "delete": {
        if (!match?.id) return NextResponse.json({ error: "ID requis pour supprimer" }, { status: 400 });
        const { error } = await supabaseAdmin.from(table).delete().eq("id", match.id);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        result = { deleted: match.id };
        break;
      }

      case "update_password": {
        if (!data?.new_password) return NextResponse.json({ error: "Nouveau mot de passe requis" }, { status: 400 });
        const { error } = await supabaseAdmin
          .from("settings")
          .update({ value: sha256(data.new_password), updated_at: new Date().toISOString() })
          .eq("key", "admin_password");
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        result = { updated: true };
        break;
      }

      default:
        return NextResponse.json({ error: "Action invalide" }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
