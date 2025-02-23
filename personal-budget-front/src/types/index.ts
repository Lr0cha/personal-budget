export const BASE_URL = "https://personal-budget-0mmm.onrender.com";

export interface expenseProps {
  id?: number;
  description?: string;
  amount: string;
  expenseType: string;
}

export interface usernameProps {
  username: string;
}

export const categoryMap: { [key: string]: string } = {
  ALUGUEL: "Aluguel",
  MERCADO: "Mercado",
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
