"use server";

export type Translation = {
  [key: string]: {
    official: string;
    common: string;
  };
};

export type Country = {
  name: {
    common: string;
    official: string;
  };
  translations: Translation;
};

export async function getCountries() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_COUNTRIES!);
    const data = (await res.json()) as Country[];
    const countries = data.sort((a, b) => {
      const commonNameA = a.name.common.toLowerCase();
      const commonNameB = b.name.common.toLowerCase();
      if (commonNameA < commonNameB) return -1;
      if (commonNameA > commonNameB) return 1;
      return 0;
    });
    return countries;
  } catch (err: any) {
    throw new Error(err);
  }
}
