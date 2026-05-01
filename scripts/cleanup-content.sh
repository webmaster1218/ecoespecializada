#!/bin/bash
# ============================================================
# LIMPIEZA DE CONTENIDO — Eco-grafos Blog
# SEGURIDAD: Solo toca archivos identificados, nada más.
# ============================================================

REPO="/opt/data/repos/ecografos-blog"
OBSIDIAN="/opt/data/obsidian/Proyectos/Fábrica de Winners/Alquiler de Ecógrafos"
CRON_OUT="/opt/data/cron/output"
CONTENT="$REPO/content"
LOG="$REPO/content/cleanup-$(date +%Y%m%d-%H%M%S).log"

echo "============================================================"
echo "DIAGNÓSTICO PRE-LIMPIEZA"
echo "============================================================"
echo ""

# --- PASO 1: Mostrar todo lo que se va a hacer ---
echo ">>> ARCHIVOS A MOVER:"
echo ""

# 1a. Artículo Medellín: articles-pending → approved/
if [ -f "$REPO/articles-pending/2026-04-28-donde-alquilar-ecografo-medellin.md" ]; then
    SIZE=$(stat -c%s "$REPO/articles-pending/2026-04-28-donde-alquilar-ecografo-medellin.md" 2>/dev/null || echo "?")
    echo "  MOVER: articles-pending/2026-04-28-donde-alquilar-ecografo-medellin.md"
    echo "    → content/approved/2026-04-28-donde-alquilar-ecografo-medellin.md"
    echo "    (${SIZE} bytes — pipeline completado, listo para integrar)"
    echo ""
fi

# 1b. Draft Cuanto Cuesta: obsidian/blog/draft-* → drafts/
if [ -f "$OBSIDIAN/blog/draft-cuanto-cuesta-ecografo-colombia-2026.md" ]; then
    SIZE=$(stat -c%s "$OBSIDIAN/blog/draft-cuanto-cuesta-ecografo-colombia-2026.md" 2>/dev/null || echo "?")
    echo "  MOVER: obsidian/.../blog/draft-cuanto-cuesta-ecografo-colombia-2026.md"
    echo "    → content/drafts/draft-cuanto-cuesta-ecografo-colombia-2026.md"
    echo "    (${SIZE} bytes — borrador original, archivar como referencia)"
    echo ""
fi

echo ">>> ARCHIVOS A ELIMINAR (duplicados confirmados):"
echo ""

# 1c. Versión final en obsidian — DUPLICADO (ya está publicado en posts.ts)
if [ -f "$OBSIDIAN/blog/2026-04-28-cuanto-cuesta-ecografo-colombia-precios-2026.md" ]; then
    SIZE=$(stat -c%s "$OBSIDIAN/blog/2026-04-28-cuanto-cuesta-ecografo-colombia-precios-2026.md" 2>/dev/null || echo "?")
    echo "  ELIMINAR: obsidian/.../blog/2026-04-28-cuanto-cuesta-ecografo-colombia-precios-2026.md"
    echo "    (${SIZE} bytes — YA PUBLICADO en posts.ts como GUI-004, es copia)"
    echo ""
fi

# 1d. Copia en cron/output — DUPLICADO
if [ -f "$CRON_OUT/articulo-cuanto-cuesta-ecografo-colombia.md" ]; then
    SIZE=$(stat -c%s "$CRON_OUT/articulo-cuanto-cuesta-ecografo-colombia.md" 2>/dev/null || echo "?")
    echo "  ELIMINAR: cron/output/articulo-cuanto-cuesta-ecografo-colombia.md"
    echo "    (${SIZE} bytes — copia de cron, ya publicado en posts.ts)"
    echo ""
fi

# 1e. test-sincronizacion (residuos de testing)
for f in \
    "$OBSIDIAN/blog/test-sincronizacion.md" \
    "$OBSIDIAN/seo-tracking/test-sincronizacion.md" \
    "$OBSIDIAN/analytics/test-sincronizacion.md"; do
    if [ -f "$f" ]; then
        SIZE=$(stat -c%s "$f" 2>/dev/null || echo "?")
        echo "  ELIMINAR: $f (${SIZE} bytes — residuo de testing)"
    fi
done
echo ""

# 1f. articles-pending vacío después del move
echo ">>> DIRECTORIO A LIMPIAR:"
echo "  articles-pending/ → eliminar (quedará vacío tras mover Medellín)"
echo ""

# --- SAFETY CHECK ---
echo "============================================================"
echo "VERIFICACIÓN DE SEGURIDAD"
echo "============================================================"

# Verificar que posts.ts tiene el artículo publicado (confirmar que eliminar es seguro)
if grep -q "cuanto-cuesta-un-ecografo-en-colombia-precios-2026" "$REPO/src/lib/blog/posts.ts" 2>/dev/null; then
    echo "✅ CONFIRMADO: 'cuanto-cuesta-un-ecografo' existe en posts.ts (GUI-004)"
    echo "   Seguro eliminar duplicados en obsidian/ y cron/output/"
else
    echo "⚠️ NO ENCONTRADO en posts.ts — NO se eliminarán los archivos"
    exit 1
fi

# Verificar que NO se toca nada en src/, .next/, public/
echo "✅ ZONAS PROTEGIDAS: src/, .next/, public/ — no se tocan"
echo "✅ SOLO se opera en: content/, obsidian/.../blog/, cron/output/"
echo ""

echo "============================================================"
echo "¿Ejecutar limpieza? (pasar --run para ejecutar)"
echo "============================================================"
echo ""
echo "Ejemplo: bash $0 --run"

# --- PASO 2: Ejecutar solo con --run ---
if [ "$1" != "--run" ]; then
    echo "Modo diagnóstico. No se realizaron cambios."
    exit 0
fi

echo ""
echo ">>> EJECUTANDO LIMPIEZA..."
echo ""

# Log header
echo "Cleanup ejecutado: $(date)" > "$LOG"
echo "========================================" >> "$LOG"

# MOVER: Medellín article → approved
echo "[1/5] Moviendo artículo Medellín a approved/..."
mv "$REPO/articles-pending/2026-04-28-donde-alquilar-ecografo-medellin.md" \
   "$CONTENT/approved/2026-04-28-donde-alquilar-ecografo-medellin.md"
echo "  ✅ content/approved/2026-04-28-donde-alquilar-ecografo-medellin.md" | tee -a "$LOG"

# MOVER: Draft Cuanto Cuesta → drafts/
echo "[2/5] Archivando draft original en drafts/..."
mv "$OBSIDIAN/blog/draft-cuanto-cuesta-ecografo-colombia-2026.md" \
   "$CONTENT/drafts/draft-cuanto-cuesta-ecografo-colombia-2026.md"
echo "  ✅ content/drafts/draft-cuanto-cuesta-ecografo-colombia-2026.md" | tee -a "$LOG"

# ELIMINAR: Versión final duplicada en obsidian (ya en posts.ts)
echo "[3/5] Eliminando duplicados confirmados..."
rm "$OBSIDIAN/blog/2026-04-28-cuanto-cuesta-ecografo-colombia-precios-2026.md"
echo "  🗑️ obsidian/.../blog/2026-04-28-cuanto-cuesta... (duplicado de posts.ts)" | tee -a "$LOG"

rm "$CRON_OUT/articulo-cuanto-cuesta-ecografo-colombia.md"
echo "  🗑️ cron/output/articulo-cuanto-cuesta... (duplicado de posts.ts)" | tee -a "$LOG"

# ELIMINAR: test-sincronizacion (residuos)
echo "[4/5] Eliminando residuos de testing..."
for f in \
    "$OBSIDIAN/blog/test-sincronizacion.md" \
    "$OBSIDIAN/seo-tracking/test-sincronizacion.md" \
    "$OBSIDIAN/analytics/test-sincronizacion.md"; do
    if [ -f "$f" ]; then
        rm "$f"
        echo "  🗑️ $(basename $(dirname "$f"))/test-sincronizacion.md" | tee -a "$LOG"
    fi
done

# LIMPIAR: articles-pending vacío
echo "[5/5] Limpiando directorio temporal..."
rmdir "$REPO/articles-pending" 2>/dev/null && echo "  🗑️ articles-pending/ (vacío, eliminado)" | tee -a "$LOG" || echo "  ⚠️ articles-pending/ no vacío, se conserva"

echo ""
echo "============================================================"
echo "LIMPIEZA COMPLETADA"
echo "============================================================"
echo ""
echo "Log guardado en: $LOG"
echo ""

# --- PASO 3: Verificar resultado ---
echo "ESTADO FINAL:"
echo ""
echo "--- content/drafts/ ---"
ls -la "$CONTENT/drafts/" 2>/dev/null
echo ""
echo "--- content/review/ ---"
ls -la "$CONTENT/review/" 2>/dev/null
echo ""
echo "--- content/approved/ ---"
ls -la "$CONTENT/approved/" 2>/dev/null
echo ""
echo "--- articles-pending/ ---"
ls -la "$REPO/articles-pending/" 2>/dev/null || echo "  (eliminado)"
echo ""
echo "--- obsidian/.../blog/ ---"
ls -la "$OBSIDIAN/blog/" 2>/dev/null
