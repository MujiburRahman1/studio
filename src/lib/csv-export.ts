function flattenObject(obj: any, parentKey = '', res: { [key: string]: any } = {}): { [key: string]: any } {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const propName = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], propName, res);
      } else {
        res[propName] = obj[key];
      }
    }
  }
  return res;
}

export function exportToCsv(data: any[], filename: string) {
  if (!data || data.length === 0) {
    return;
  }

  const flattenedData = data.map(row => flattenObject(row));

  const headers = Object.keys(flattenedData[0]);
  const csvRows = [
    headers.join(','), // header row
    ...flattenedData.map(row =>
      headers
        .map(fieldName => {
          let value = row[fieldName];
          if (value === null || value === undefined) {
            return '';
          }
          if (typeof value === 'string') {
            // Escape quotes by doubling them and wrap in quotes if it contains a comma
            const escaped = value.replace(/"/g, '""');
            if (escaped.includes(',')) {
              return `"${escaped}"`;
            }
            return escaped;
          }
          if (Array.isArray(value)) {
            return `"${value.join('; ')}"`;
          }
          return value;
        })
        .join(',')
    ),
  ];

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
