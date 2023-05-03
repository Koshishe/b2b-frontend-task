export const getCarrierImageSrc = (carrier: string): string =>
  `http://pics.avs.io/99/36/${carrier}.png`;

export const getPriceWithSpaces = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const getWordDeclination = (
  root: string,
  endings: string[],
  count: number
) => {
  const numb = count % 10;

  if ((count >= 10 && count <= 20) || count === 0 || numb >= 5) {
    return `${root}${endings[0]}`;
  } else if (numb === 1) {
    return `${root}${endings[1]}`;
  } else {
    return `${root}${endings[2]}`;
  }
};

export const sliceList = <T>(tickets: T[], count: number): T[] => {
  return tickets.slice(0, count);
};
