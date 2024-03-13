export const handleSearch = (search: string, filters: string[]): string => {
    if (filters.length === 0 && search !== "") {
      return `first_name=${search}`;
    }
  
    const searchParams = filters.map((filter) => `${filter}=${search}`).join('&');
    return searchParams;
  };
  