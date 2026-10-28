// Regenera ../schema.json a partir de esquema.dbml (o de la ruta que se pase como argumento).
import fs from 'node:fs';
import { Parser } from '@dbml/core';

const src = process.argv[2] || 'esquema.dbml';
const db = new Parser().parse(fs.readFileSync(src, 'utf8'), 'dbmlv2');
const s = db.schemas[0];

const groupOf = new Map();
const groups = s.tableGroups.map(g => {
  g.tables.forEach(t => groupOf.set(t.name, g.name));
  return { id: g.name, name: g.note || g.name, color: g.color || '#0f4c5c', tables: g.tables.map(t => t.name) };
});
const tables = s.tables.map(t => ({
  n: t.name,
  g: groupOf.get(t.name) || null,
  note: t.note || null,
  f: t.fields.map(f => {
    const o = { n: f.name, t: f.type.type_name };
    if (f.pk) o.pk = 1;
    if (f.not_null) o.nn = 1;
    if (f.unique) o.u = 1;
    return o;
  }),
}));
const refs = s.refs.map(r => r.endpoints.map(e => ({ t: e.tableName, c: e.fieldNames, r: e.relation })));

const sinModulo = tables.filter(t => !t.g).map(t => t.n);
if (sinModulo.length) console.warn(`Aviso: ${sinModulo.length} tablas sin TableGroup no se mostrarán: ${sinModulo.join(', ')}`);

fs.writeFileSync(new URL('../schema.json', import.meta.url), JSON.stringify({ groups, tables, refs }));
console.log(`schema.json actualizado: ${tables.length} tablas, ${refs.length} relaciones, ${groups.length} módulos.`);
