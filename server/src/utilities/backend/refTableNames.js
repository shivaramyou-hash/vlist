const checkAndAddTableToReference = async () => {
  try {
    const queryText = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'TG%';
    `;
    const { rows } = await knex.raw(queryText);

    const tableNames = rows.map((row) => row.table_name);
    const filteredTableNames = tableNames.filter(
      (tableName) => tableName !== "TG-17-58"
    );

    for (let tableName of filteredTableNames) {
      const refData = await knex
        .select("*")
        .from("reference_table")
        .where({ tableName });
      const tableExists = refData.length > 0;

      if (!tableExists) {
        const [state, district, assemblyConst, psNo] = tableName.split("-");

        // Insert data into reference_table
        await knex.raw(
          'INSERT INTO reference_table ("tableName", state, district, "assemblyConstCode", "psNo") VALUES (?, ?, ?, ?, ?)',
          [tableName, state, district, assemblyConst, psNo]
        );
        console.log(`Table ${tableName} added to reference_table.`);
      } else {
        console.log(
          `Table ${tableName} already exists in reference_table. No action needed.`
        );
      }
    }
  } catch (error) {
    console.error(
      "Error checking and adding tables to reference_table:",
      error
    );
  }
};
await checkAndAddTableToReference("TG-17-58-1");
