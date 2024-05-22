export const formatToShow = (url: string) => {
  let newUrl = url;

  if (newUrl.search('://') >= 0) {
    newUrl = newUrl.split('://')[1];
  }

  if (newUrl[newUrl.length - 1] === '/') newUrl = newUrl.slice(0, -1);

  return newUrl;
};

export const mapErrorResponse = (error: any) => {
  return error?.response?.data?.message || 'Algo errado...';
};
