import axios from 'axios';

const api = axios.create({
    baseURL:"https://restcountries.com/v3.1"
});

export const getCountryData = async () => {
  try {
      const res = await api.get("/all?fields=name,population,region,capital,flags");
      console.log("API Response Status:", res.status);
      console.log("API Response Data:", res.data);
      return res;
  } catch (error) {
      console.error("Error fetching country data:", error.response ? error.response.data : error.message);
  }
};


export const getCountryIndData = (name) => {
  return api.get(
    `/name/${name}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
  );
};