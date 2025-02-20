export const MonthYearDisplay: React.FC = () => {
  const currentDate = new Date();

  const formattedMonthYear = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
  }).format(currentDate);

  return <p className="text-md text-gray-500">Mês: {formattedMonthYear}</p>;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
