import fs from "node:fs";
import path from "node:path";

function parseCsvLine(line) {
  const result = [];
  let value = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      const nextChar = line[i + 1];
      if (inQuotes && nextChar === '"') {
        value += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(value);
      value = "";
      continue;
    }

    value += char;
  }

  result.push(value);
  return result.map((entry) => entry.trim());
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default () => {
  const csvPath = path.join(process.cwd(), "_data", "bookTable.csv");
  const source = fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/, "").trim();

  if (!source) {
    return {
      bol: {
        name: "bol.com",
        icon: "https://cdn.sanity.io/images/qxrxmo3r/over-prd/510e6d75ea3ae45058065da3b7015eb84da40caf-2560x1400.jpg"
      },
      items: [],
      categoryOptions: []
    };
  }

  const lines = source.split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);

  const rows = lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    const row = {};
    header.forEach((column, index) => {
      row[column] = cells[index] || "";
    });

    const categories = row.categories
      ? row.categories.split("|").map((c) => c.trim()).filter(Boolean)
      : [];

    const bookstores = [
      { name: "Den Hertog", url: row.denHertogUrl, icon: "https://www.denhertog.nl/favicon.ico" },
      { name: "De Fakkel Hoogeveen", url: row.deFakkelUrl, icon: "https://www.defakkelhoogeveen.nl/home-sq.png" },
      { name: "Boekhandel logo 2", url: row.logo2Url, icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0S_73kJ0ca3T5AWMxRr9PxcDw9JbxFM-cw&s" },
      { name: "Sjofar", url: row.sjofarUrl, icon: "https://www.sjofar.nl/home-ls.png" }
    ].filter((store) => store.url);

    return {
      author: row.author,
      title: row.title,
      categories,
      categorySlugs: categories.map(slugify),
      languageCode: row.languageCode,
      language: row.language,
      bookstores,
      bolUrl: row.bolUrl || ""
    };
  });

  const categoryOptions = Array.from(
    new Map(
      rows.flatMap((book) =>
        book.categories.map((label, index) => [book.categorySlugs[index], label])
      )
    ),
    ([value, label]) => ({ value, label })
  ).sort((a, b) => a.label.localeCompare(b.label, "nl"));

  return {
    bol: {
      name: "bol.com",
      icon: "https://cdn.sanity.io/images/qxrxmo3r/over-prd/510e6d75ea3ae45058065da3b7015eb84da40caf-2560x1400.jpg"
    },
    items: rows,
    categoryOptions
  };
};
