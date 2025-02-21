export const BASE_URL = "http://localhost:8081/";

export interface expenseProps {
  id?: number;
  description?: string;
  amount: string;
  expenseType: string;
}

export const categoryMap: { [key: string]: string } = {
  MERCADO: "Mercado",
  ALUGUEL: "Aluguel",
  TRANSPORTE: "Transporte",
  LAZER: "Lazer",
  SAUDE: "Saúde",
  EDUCACAO: "Educação",
  OUTROS: "Outros",
};

interface valuesMenuInterface {
  text: string;
  path: string;
}

export const valuesMenu: { [key: string]: valuesMenuInterface } = {
  DASHBOARD: {
    text: "Minhas Despesas",
    path: "/",
  },
  REPORTS: {
    text: "Meus relatórios",
    path: "/reports",
  },
  UPDATE_PASSWORD: {
    text: "Mudar senha",
    path: "/update",
  },
};
