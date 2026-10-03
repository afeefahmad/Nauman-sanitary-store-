export function normalizeBrand(brandName) {
  if (!brandName) return 'Unbranded';
  const name = brandName.trim().toLowerCase();
  if (name.includes('pool')) return 'Pool Sanitary Ware';
  if (name.includes('dell')) return 'Dell Sanitary Ware';
  if (name.includes('master') && name.includes('pipe')) return 'Master Pipes And Fittings';
  if (name.includes('master')) return 'Master Sanitary Ware';
  if (name.includes('nesco')) return 'Nesco Ceramics';
  if (name.includes('brite')) return 'Brite Sanitary Ware';
  if (name.includes('porta')) return 'Porta';
  if (name.includes('kale')) return 'Kale';
  if (name.includes('icl') || name.includes('boch')) return 'ICL Boch';
  if (name.includes('minhas')) return 'Minhas Pipes and Fittings';
  if (name.includes('turk')) return 'Turk Plast';
  if (name.includes('dura')) return 'Dura Flow';
  return brandName.trim();
}
