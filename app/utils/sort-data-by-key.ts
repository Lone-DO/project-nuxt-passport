export function sortDataByKey(key: string, data: { [key: string]: any }[], direction: 'asc' | 'desc' = 'asc') {
  if (!key || !data?.length) {
    return null;
  }

  return data?.sort((a, b) => {
    const isAscending = direction === 'asc';
    if (a?.[key].localeCompare) {
      return (isAscending) ? a[key].localeCompare(b?.[key]) : b[key].localeCompare(a[key]);
    }
    if (a?.[key] < b?.[key]) {
      return isAscending ? -1 : 1;
    }
    if (b?.[key] < a?.[key]) {
      return isAscending ? 1 : -1;
    }
    return 0;
  });
}
