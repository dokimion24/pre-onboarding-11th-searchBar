import axios, { AxiosResponse } from 'axios';

export interface Sick {
  sickCd: string;
  sickNm: string;
}

export const getSicks = async (params: { q: string }) => {
  const res = await axios.get(`http://localhost:4000/sick`, { params });

  if (res.data.length >= 10) {
    return res.data.slice(0, 10);
  }

  return res.data;
};
