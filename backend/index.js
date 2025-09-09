const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pool = require('./db');
const logger = require('./logger');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// CREATE customer
// app.post('/customers', async (req, res) => {
//   try {
//     const { first_name, last_name, phone, email, address, city, state, pin, account_type } = req.body;
//     const result = await pool.query(
//       `INSERT INTO customers (first_name, last_name, phone, email, address, city, state, pin, account_type)
//        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
//       [first_name, last_name, phone, email, address, city, state, pin, account_type]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     logger.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post('/customers', async (req, res) => {
//   try {
//     const { first_name, last_name, phone, email, address, city, state, pin, account_type } = req.body;

//     // 🔎 Check if phone OR email already exists
//     const duplicate = await pool.query(
//       `SELECT * FROM customers WHERE phone = $1 OR email = $2`,
//       [phone, email]
//     );

//     if (duplicate.rows.length > 0) {
//       return res.status(409).json({ message: '⚠️ Phone or Email already exists!' });
//     }

//     const result = await pool.query(
//       `INSERT INTO customers (first_name, last_name, phone, email, address, city, state, pin, account_type)
//        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
//       [first_name, last_name, phone, email, address, city, state, pin, account_type]
//     );

//     res.json(result.rows[0]);
//   } catch (err) {
//     logger.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });


// CREATE customer with duplicate check
// app.post('/customers', async (req, res) => {
//   try {
//     const { first_name, last_name, phone, email, address, city, state, pin, account_type } = req.body;

//     // 🔍 Check for duplicate phone/email
//     const duplicate = await pool.query(
//       `SELECT * FROM customers WHERE phone = $1 OR email = $2 LIMIT 1`,
//       [phone, email]
//     );

//     if (duplicate.rows.length > 0) {
//       return res.status(400).json({ 
//         error: 'Phone number or email already exists. Please use a different one.' 
//       });
//     }

//     // ✅ Insert if no duplicates
//     const result = await pool.query(
//       `INSERT INTO customers (first_name, last_name, phone, email, address, city, state, pin, account_type)
//        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
//       [first_name, last_name, phone, email, address, city, state, pin, account_type]
//     );

//     res.json(result.rows[0]);
//   } catch (err) {
//     logger.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });


// Create Customer
app.post("/customers", async (req, res) => {
  try {
    const { first_name, last_name, phone, email , address, city, state, pin, account_type } = req.body;
    const result = await pool.query(
      `INSERT INTO customers (first_name, last_name, phone, email,  address, city, state, pin, account_type, address_count)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [first_name, last_name, phone, email, address, city, state, pin, account_type, 1]
    );
    res.json({ message: "✅ Customer created successfully", customer: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create customer" });
  }
});
// Get All Customers
// app.get("/customers", async (req, res) => {
//   try {
//     // const result = await pool.query("SELECT * FROM customers ORDER BY created_at DESC");
//     const result = await pool.query(`
//       SELECT 
//         id,
//         first_name AS "firstName",
//         last_name AS "lastName",
//         phone,
//         email,
//         address,
//         city,
//         state,
//         pin,
//         account_type AS "accountType",
//         address_count AS "addressCount", -- ✅ alias for frontend
//         created_at AS "createdAt",
//         updated_at AS "updatedAt"
//       FROM customers
//       ORDER BY created_at DESC
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch customers" });
//   }
// });



app.get("/customers", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        phone,
        email,
        address,
        city,
        state,
        pin,
        account_type AS "accountType",
        address_count AS "addressCount",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM customers
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});


//Update customer


// app.get("/customers", async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         id,
//         first_name AS "firstName",
//         last_name AS "lastName",
//         phone,
//         email,
//         address,
//         city,
//         state,
//         pin,
//         account_type AS "accountType",
//         address_count AS "addressCount",
//         created_at AS "createdAt"
//       FROM customers
//       ORDER BY created_at DESC
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch customers" });
//   }
// });


app.get("/customers/search", async (req, res) => {
  try {
    const { city, state, pin } = req.query;
    let conditions = [];
    let values = [];
    let idx = 1;

    // For filtering conditions
    if (city) { conditions.push(`city ILIKE $${idx++}`); values.push(`%${city}%`); }
    if (state) { conditions.push(`state ILIKE $${idx++}`); values.push(`%${state}%`); }
    if (pin) { conditions.push(`pin = $${idx++}`); values.push(pin); }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
  -- From customers table
  SELECT 
    c.id AS "id",
    c.first_name AS "firstName",
    c.last_name AS "lastName",
    c.phone AS "phone",
    c.email AS "email",
    c.address AS "addressLine",
    c.city AS "city",
    c.state AS "state",
    c.pin AS "pin",
    c.account_type AS "accountType",
    c.address_count AS "addressCount"
  FROM customers c
  ${whereClause.replace(/city|state|pin/g, 'c.$&')}

  UNION ALL

  -- From addresses table
  SELECT 
    c.id AS "id",
    c.first_name AS "firstName",
    c.last_name AS "lastName",
    c.phone AS "phone",
    c.email AS "email",
    a.address_line AS "addressLine",
    a.city AS "city",
    a.state AS "state",
    a.pin AS "pin",
    a.account_type AS "accountType",
    c.address_count AS "addressCount"
  FROM customers c
  JOIN addresses a ON c.id = a.customer_id
  ${whereClause.replace(/city|state|pin/g, 'a.$&')}
`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search customers" });
  }
});




app.get("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      SELECT 
        id,
        first_name AS "firstName",
        last_name AS "lastName",
        phone,
        email,
        address,
        city,
        state,
        pin,
        account_type AS "accountType",
        address_count AS "addressCount",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM customers
      WHERE id = $1
      `,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch customer details" });
  }
});



app.put("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone, email, address, city, state, pin, account_type } = req.body;
    await pool.query(
      `UPDATE customers 
       SET first_name=$1, last_name=$2, phone=$3, email=$4,
       address=$5, city=$6, state=$7, pin=$8, account_type=$9, updated_at=now() 
       WHERE id=$10`,
      [first_name, last_name, phone, email, address, city, state, pin, account_type, id]
    );
    res.json({ message: "✅ Customer updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update customer" });
  }
});


app.get("/customers/multiple-addresses", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.id AS customer_id, c.first_name, c.last_name, COUNT(a.id) AS address_count
      FROM customers c
      JOIN addresses a ON c.id = a.customer_id
      GROUP BY c.id
      HAVING COUNT(a.id) > 1
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch multiple-address customers" });
  }
});



app.get("/customers/address-status", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.id AS customer_id,
        c.first_name,
        c.last_name,
        c.phone,
        c.email,
        -- Count addresses: 1 for customers table + how many in addresses table
        1 + COUNT(a.id) AS address_count
      FROM customers c
      LEFT JOIN addresses a ON c.id = a.customer_id
      GROUP BY c.id, c.first_name, c.last_name, c.phone, c.email
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch customers with address status" });
  }
});


// GET /customers/only-one-address
app.get("/customers/only-one-address", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.id AS customer_id, c.first_name, c.last_name, COUNT(a.id) AS address_count
      FROM customers c
      JOIN addresses a ON c.id = a.customer_id
      GROUP BY c.id
      HAVING COUNT(a.id) = 1
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch customers with only one address" });
  }
});



// app.get("/customers/search", async (req, res) => {
//   try {
//     const { city, state, pin } = req.query;
//     //let conditions = [];
//     let values = [];
//     let idx = 1;
//     let customerConditions = [];
//     if (city) { conditions.push(`c.city ILIKE $${idx++}`); values.push(`%${city}%`); }
//     if (state) { conditions.push(`c.state ILIKE $${idx++}`); values.push(`%${state}%`); }
//     if (pin) { conditions.push(`c.pin = $${idx++}`); values.push(pin); }
//     let addressConditions = [];
//     //let j = idx; // continue param index
//     if (city) { conditions.push(`a.city ILIKE $${idx++}`); values.push(`%${city}%`); }
//     if (state) { conditions.push(`a.state ILIKE $${idx++}`); values.push(`%${state}%`);}
//     if (pin) { conditions.push(`a.pin = $${idx++}`); values.push(pin); }

//     // let whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";


//     const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

//     const query = `
//       SELECT 
//         c.id AS customer_id,
//         c.first_name,
//         c.last_name,
//         c.phone,
//         c.email,
//         c.address as address_line,
//         c.city,
//         c.state,
//         c.pin,
//         c.account_type
//       FROM customers c
//       ${customerConditions.length ? "WHERE " + customerConditions.join(" AND ") : ""}

//       UNION ALL

//       SELECT 
//         c.id AS customer_id,
//         c.first_name,
//         c.last_name,
//         c.phone,
//         c.email,
//         a.address_line,
//         a.city,
//         a.state,
//         a.pin,
//         a.account_type
//       FROM customers c
//       JOIN addresses a ON c.id = a.customer_id
//       ${addressConditions.length ? "WHERE " + addressConditions.join(" AND ") : ""}
//     `;

//       // JOIN addresses a ON c.id = a.customer_id
//       // ${whereClause}
//     // `;

//     // const result = await pool.query(`
//     //   SELECT c.id AS customer_id, c.first_name, c.last_name, a.address_line, a.city, a.state, a.pin
//     //   FROM customers c
//     //   JOIN addresses a ON c.id = a.customer_id
//     //   ${whereClause}
//     // `, values);
//     const result = await pool.query(query,values);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to search customers" });
//   }
// });

// Delete Customer

// app.get("/customers/search", async (req, res) => {
//   try {
//     const { city, state, pin } = req.query;

//     let conditionsCustomers = [];
//     let values = [];
//     let idx = 1;

//     // Conditions for customers table
//     if (city) {
//       conditionsCustomers.push(`c.city ILIKE $${idx}`);
//       values.push(`%${city}%`);
//       idx++;
//     }
//     if (state) {
//       conditionsCustomers.push(`c.state ILIKE $${idx}`);
//       values.push(`%${state}%`);
//       idx++;
//     }
//     if (pin) {
//       conditionsCustomers.push(`c.pin = $${idx}`);
//       values.push(pin);
//       idx++;
//     }

//     const whereCustomers = conditionsCustomers.length
//       ? `WHERE ${conditionsCustomers.join(" AND ")}`
//       : "";

//     // Conditions for addresses table
//     let conditionsAddresses = [];
//     if (city) {
//       conditionsAddresses.push(`a.city ILIKE $${idx}`);
//       values.push(`%${city}%`);
//       idx++;
//     }
//     if (state) {
//       conditionsAddresses.push(`a.state ILIKE $${idx}`);
//       values.push(`%${state}%`);
//       idx++;
//     }
//     if (pin) {
//       conditionsAddresses.push(`a.pin = $${idx}`);
//       values.push(pin);
//       idx++;
//     }

//     const whereAddresses = conditionsAddresses.length
//       ? `WHERE ${conditionsAddresses.join(" AND ")}`
//       : "";

//     // Final query combines both sources
//     const query = `
//       SELECT 
//         c.id AS customer_id,
//         c.first_name,
//         c.last_name,
//         c.phone,
//         c.email,
//         c.city,
//         c.state,
//         c.pin,
//         c.account_type,
//         c.address AS address_line
//       FROM customers c
//       ${whereCustomers}

//       UNION ALL

//       SELECT 
//         c.id AS customer_id,
//         c.first_name,
//         c.last_name,
//         c.phone,
//         c.email,
//         a.city,
//         a.state,
//         a.pin,
//         a.account_type,
//         a.address_line
//       FROM customers c
//       JOIN addresses a ON c.id = a.customer_id
//       ${whereAddresses}
//     `;

//     console.log("🔍 Final SQL:", query, values);

//     const result = await pool.query(query, values);
//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Search error:", err);
//     res.status(500).json({ error: "Failed to search customers" });
//   }
// });

// app.get("/customers/search", async (req, res) => {
//   try {
//     const { city, state, pin } = req.query;
//     let conditions = [];
//     let values = [];
//     let idx = 1;

//     if (city) {
//       conditions.push(`(c.city ILIKE $${idx} OR a.city ILIKE $${idx})`);
//       values.push(`%${city}%`);
//       idx++;
//     }
//     if (state) {
//       conditions.push(`(c.state ILIKE $${idx} OR a.state ILIKE $${idx})`);
//       values.push(`%${state}%`);
//       idx++;
//     }
//     if (pin) {
//       conditions.push(`(c.pin = $${idx} OR a.pin = $${idx})`);
//       values.push(pin);
//       idx++;
//     }

//     const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

//     const query = `
//       SELECT 
//         c.id,
//         c.first_name as firstName,
//         c.last_name as lastName,
//         c.phone,
//         c.email,
//         c.account_type,
//         json_agg(
//           json_build_object(
//             'address', COALESCE(a.address_line, c.address),
//             'city', COALESCE(a.city, c.city),
//             'state', COALESCE(a.state, c.state),
//             'pin', COALESCE(a.pin, c.pin),
//             'account_type', a.account_type
//           )
//         ) AS addresses
//       FROM customers c
//       LEFT JOIN addresses a ON c.id = a.customer_id
//       ${whereClause}
//       GROUP BY c.id,c.first_name, c.last_name, c.phone, c.email, c.account_type
//     `;

//     const result = await pool.query(query, values);
//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Search error:", err);
//     res.status(500).json({ error: "Failed to search customers" });
//   }
// });

// app.get("/customers/search", async (req, res) => {
//   try {
//     const { city, state, pin } = req.query;
//     let conditions = [];
//     let values = [];
//     let idx = 1;

//     // For filtering conditions
//     if (city) { conditions.push(`city ILIKE $${idx++}`); values.push(`%${city}%`); }
//     if (state) { conditions.push(`state ILIKE $${idx++}`); values.push(`%${state}%`); }
//     if (pin) { conditions.push(`pin = $${idx++}`); values.push(pin); }

//     const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

//     const query = `
//       -- Take address from customers table
//       SELECT 
//         c.id AS "id",
//         c.first_name AS "firstName",
//         c.last_name AS "lastName",
//         c.phone AS "phone",
//         c.email AS "email",
//         c.address AS "addressLine",
//         c.city AS "city",
//         c.state AS "state",
//         c.pin AS "pin",
//         c.account_type AS "accountType"
//       FROM customers c
//       ${whereClause.replace(/city|state|pin/g, 'c.\$&')}

//       UNION ALL

//       -- Take address from addresses table
//       SELECT 
//         c.id AS "id",
//         c.first_name AS "firstName",
//         c.last_name AS "lastName",
//         c.phone AS "phone",
//         c.email AS "email",
//         a.address_line AS "addressLine",
//         a.city AS "city",
//         a.state AS "state",
//         a.pin AS "pin",
//         a.account_type AS "accountType"
//       FROM customers c
//       JOIN addresses a ON c.id = a.customer_id
//       ${whereClause.replace(/city|state|pin/g, 'a.\$&')}
//     `;

//     const result = await pool.query(query, values);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to search customers" });
//   }
// });



// app.get("/customers/search", async (req, res) => {
//   try {
//     const { city, state, pin } = req.query;
//     let customerConditions = [];
//     let addressConditions =[];
//     let values = [];
//     let idx = 1;

//     // For filtering conditions
//     if (city && city.trim() !== "") { customerConditions.push(`city ILIKE $${idx++}`); values.push(`%${city}%`); }
//     if (state && state.trim() !== "") { customerConditions.push(`state ILIKE $${idx++}`); values.push(`%${state}%`); }
//     if (pin && pin.trim() !== "") { customerConditions.push(`pin = $${idx++}`); values.push(pin); }
//     if (city && city.trim() !== "") { addressConditions.push(`city ILIKE $${idx++}`); values.push(`%${city}%`); }
//     if (state && state.trim() !== "") { addressConditions.push(`state ILIKE $${idx++}`); values.push(`%${state}%`); }
//     if (pin && pin.trim() !== "") { addressConditions.push(`pin = $${idx++}`); values.push(pin); }

//     const customerWhere = customerConditions.length ? `WHERE ${customerConditions.join(" OR ")}` : "";
//     const addressWhere = addressConditions.length ? `WHERE ${addressConditions.join(" OR ")}` : "";

//     const query = `
//       -- Take address from customers table
//       SELECT 
//         c.id AS "id",
//         c.first_name AS "firstName",
//         c.last_name AS "lastName",
//         c.phone AS "phone",
//         c.email AS "email",
//         c.address AS "addressLine",
//         c.city AS "city",
//         c.state AS "state",
//         c.pin AS "pin",
//         c.account_type AS "accountType",
//         c.address_count AS "addressCount"
//       FROM customers c
//       ${customerWhere}

//       UNION ALL

//       -- Take address from addresses table
//       SELECT 
//         c.id AS "id",
//         c.first_name AS "firstName",
//         c.last_name AS "lastName",
//         c.phone AS "phone",
//         c.email AS "email",
//         a.address_line AS "addressLine",
//         a.city AS "city",
//         a.state AS "state",
//         a.pin AS "pin",
//         a.account_type AS "accountType",
//         c.address_count AS "addressCount"
//       FROM customers c
//       JOIN addresses a ON c.id = a.customer_id
//       ${addressWhere}
//     `;

//     const result = await pool.query(query, values);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to search customers" });
//   }
// });
// app.get("/customers/search", async (req, res) => {
//   try {
//       const { city, state, pin } = req.query;
//       let conditions = [];
//       let values = [];
//       let idx = 1;

//       if (city && city.trim() !== "") {
//         conditions.push(`(c.city ILIKE $${idx} OR a.city ILIKE $${idx})`);
//         values.push(`%${city}%`);
//         idx++;
//       }
//       if (state && state.trim() !== "") {
//         conditions.push(`(c.state ILIKE $${idx} OR a.state ILIKE $${idx})`);
//         values.push(`%${state}%`);
//         idx++;
//       }
//       if (pin && pin.trim() !== "") {
//         conditions.push(`(c.pin = $${idx} OR a.pin = $${idx})`);
//         values.push(pin);
//         idx++;
//       }

//       const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

//       const query = `
//         SELECT 
//           c.id AS "id",
//           c.first_name AS "firstName",
//           c.last_name AS "lastName",
//           c.phone AS "phone",
//           c.email AS "email",
//           COALESCE(a.address_line, c.address) AS "addressLine",
//           COALESCE(a.city, c.city) AS "city",
//           COALESCE(a.state, c.state) AS "state",
//           COALESCE(a.pin, c.pin) AS "pin",
//           COALESCE(a.account_type, c.account_type) AS "accountType",
//           c.address_count AS "addressCount"
//         FROM customers c
//         LEFT JOIN addresses a ON c.id = a.customer_id
//         ${whereClause}
//       `;

//       console.log("🔍 SQL:", query, values);
//       const result = await pool.query(query, values);
//       res.json(result.rows);
//     } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to search customers" });
//   }
// });
// app.get("/customers/search", async (req, res) => {
//   try {
//     const { city, state, pin } = req.query;
//     let conditions = [];
//     let values = [];
//     let idx = 1;

//     if (city && city.trim() !== "") {
//       conditions.push(`(c.city ILIKE $${idx} OR a.city ILIKE $${idx})`);
//       values.push(`%${city}%`);
//       idx++;
//     }
//     if (state && state.trim() !== "") {
//       conditions.push(`(c.state ILIKE $${idx} OR a.state ILIKE $${idx})`);
//       values.push(`%${state}%`);
//       idx++;
//     }
//     if (pin && pin.trim() !== "") {
//       conditions.push(`(c.pin = $${idx} OR a.pin = $${idx})`);
//       values.push(pin);
//       idx++;
//     }

//     const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

//     const query = `
//       SELECT 
//         c.id AS "id",
//         c.first_name AS "firstName",
//         c.last_name AS "lastName",
//         c.phone AS "phone",
//         c.email AS "email",
//         COALESCE(a.address_line, c.address) AS "addressLine",
//         COALESCE(a.city, c.city) AS "city",
//         COALESCE(a.state, c.state) AS "state",
//         COALESCE(a.pin, c.pin) AS "pin",
//         COALESCE(a.account_type, c.account_type) AS "accountType",
//         c.address_count AS "addressCount"
//       FROM customers c
//       LEFT JOIN addresses a ON c.id = a.customer_id
//       ${whereClause}
//     `;

//     console.log("🔍 Query:", query);
//     console.log("🔍 Values:", values);

//     const result = await pool.query(query, values);
//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ SQL Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });





// app.delete("/customers/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query("DELETE FROM customers WHERE id=$1", [id]);
//     res.json({ message: "🗑️ Customer deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to delete customer" });
//   }
// });


// app.delete("/customers/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Start a transaction
//     await pool.query("BEGIN");

//     // Delete all addresses for this customer
//     await pool.query("DELETE FROM addresses WHERE customer_id = $1", [id]);

//     // Delete the customer itself
//     await pool.query("DELETE FROM customers WHERE id = $1", [id]);

//     await pool.query("COMMIT");

//     res.json({ message: "Customer and related addresses deleted successfully" });
//   } catch (err) {
//     await pool.query("ROLLBACK");
//     console.error("❌ Error deleting customer:", err);
//     res.status(500).json({ error: "Failed to delete customer and addresses" });
//   }
// });


// backend/index.js

// app.delete("/customers/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     await pool.query("BEGIN");

//     // ✅ Check if customer exists
//     const customer = await pool.query("SELECT id FROM customers WHERE id = $1", [id]);
//     if (customer.rows.length === 0) {
//       await pool.query("ROLLBACK");
//       return res.status(404).json({ error: "Customer not found" });
//     }

//     // Delete all addresses first
//     await pool.query("DELETE FROM addresses WHERE customer_id = $1", [id]);

//     // Delete customer
//     await pool.query("DELETE FROM customers WHERE id = $1", [id]);

//     await pool.query("COMMIT");

//     res.json({ message: "Customer and related addresses deleted successfully" });
//   } catch (err) {
//     await pool.query("ROLLBACK");
//     console.error("❌ Error deleting customer:", err);
//     res.status(500).json({ error: "Failed to delete customer and addresses" });
//   }
// });

// backend/index.js

app.delete("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("BEGIN");

    // ✅ Check if customer exists
    const customer = await pool.query("SELECT id FROM customers WHERE id = $1", [id]);
    if (customer.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ error: "Customer not found" });
    }

    // ✅ Delete all addresses belonging to this customer
    await pool.query("DELETE FROM addresses WHERE customer_id = $1", [id]);

    // ✅ Delete the customer
    await pool.query("DELETE FROM customers WHERE id = $1", [id]);

    await pool.query("COMMIT");

    res.json({ message: "🗑️ Customer and all related addresses deleted successfully" });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("❌ Error deleting customer:", err);
    res.status(500).json({ error: "Failed to delete customer and addresses" });
  }
});


// READ customers
// app.get('/customers', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM customers ORDER BY id ASC');
//     res.json(result.rows);
//   } catch (err) {
//     logger.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// UPDATE customer
// app.put('/customers/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { first_name, last_name, phone, email, address, city, state, pin, account_type } = req.body;
//     const result = await pool.query(
//       `UPDATE customers SET first_name=$1,last_name=$2,phone=$3,email=$4,address=$5,city=$6,state=$7,pin=$8,account_type=$9
//        WHERE id=$10 RETURNING *`,
//       [first_name, last_name, phone, email, address, city, state, pin, account_type, id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     logger.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });



// app.put('/customers/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { first_name, last_name, phone, email, address, city, state, pin, account_type } = req.body;

//     // 🔎 Check if phone OR email already exists (but not for this same customer)
//     const duplicate = await pool.query(
//       `SELECT * FROM customers WHERE (phone = $1 OR email = $2) AND id <> $3`,
//       [phone, email, id]
//     );

//     if (duplicate.rows.length > 0) {
//       return res.status(409).json({ message: '⚠️ Phone or Email already exists!' });
//     }

//     const result = await pool.query(
//       `UPDATE customers 
//        SET first_name=$1,last_name=$2,phone=$3,email=$4,address=$5,city=$6,state=$7,pin=$8,account_type=$9
//        WHERE id=$10 RETURNING *`,
//       [first_name, last_name, phone, email, address, city, state, pin, account_type, id]
//     );

//     res.json(result.rows[0]);
//   } catch (err) {
//     logger.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE customer
// app.delete('/customers/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query('DELETE FROM customers WHERE id=$1', [id]);
//     res.json({ message: 'Customer deleted' });
//   } catch (err) {
//     logger.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });






// ========================
// Addresses APIs
// ========================

// Add Address
app.post("/addresses", async (req, res) => {
  try {
    const { customer_id, address_line, city, state, pin, account_type } = req.body;
    const result = await pool.query(
      `INSERT INTO addresses (customer_id, address_line, city, state, pin, account_type,created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, now(), now()) RETURNING *`,
      [customer_id, address_line, city, state, pin, account_type]
    );

    await pool.query(
      `UPDATE customers 
       SET address_count = address_count + 1, updated_at = now()
       WHERE id = $1`,
      [customer_id]
    );

    res.json({ message: "✅ Address added successfully", address: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add address" });
  }
});
app.post("/customers/:id/addresses", async (req, res) => {
  try {
    const { id } = req.params;
    const { address_line, city, state, pin, account_type } = req.body;

    const result = await pool.query(
      `INSERT INTO addresses 
        (customer_id, address_line, city, state, pin, account_type, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6, now(), now())
       RETURNING *`,
      [id, address_line, city, state, pin, account_type]
    );

    await pool.query(
      `UPDATE customers 
       SET address_count = address_count + 1, updated_at = now()
       WHERE id = $1`,
      [id]
    );

    res.json({ message: "✅ Address added successfully", address: result.rows[0] });
  } catch (err) {
    console.error("❌ Error adding address:", err);
    res.status(500).json({ error: "Failed to add address" });
  }
});


// Get Addresses by Customer
app.get("/customers/:id/addresses", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM addresses WHERE customer_id=$1 ORDER BY created_at DESC", [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
});

// Update Address
app.put("/addresses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { address_line, city, state, pin, account_type } = req.body;
    const result=await pool.query(
      `UPDATE addresses 
       SET address_line=$1, city=$2, state=$3, pin=$4, account_type=$5, updated_at=now() 
       WHERE id=$6`,
      [address_line, city, state, pin, account_type, id]
    );
    // res.json({ message: "✅ Address updated successfully" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update address" });
  }
});

// Delete Address
// app.delete("/addresses/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query("SELECT customer_id FROM addresses WHERE id=$1", [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Address not found" });
//     }
//     const customerId = result.rows[0].customer_id;
//     // await pool.query("DELETE FROM addresses WHERE id=$1", [id]);
//     // if (result.rows.length === 0) {
//     //   return res.status(404).json({ error: "Address not found" });
//     // }
//     // res.json({ message: "🗑️ Address deleted successfully" });
//     await pool.query("DELETE FROM addresses WHERE id=$1", [id]);

//     // Decrement address_count
//     await pool.query(
//       `UPDATE customers 
//        SET address_count = GREATEST(address_count - 1, 1), updated_at = now()
//        WHERE id = $1`,
//       [customerId]
//     );

//     res.json({ message: "🗑️ Address deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to delete address" });
//   }
// });



// backend/index.js

app.delete("/addresses/:id", async (req, res) => { 
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT customer_id FROM addresses WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Address not found" });
    }

    const customerId = result.rows[0].customer_id;

    await pool.query("DELETE FROM addresses WHERE id=$1", [id]);

    // ✅ Fix address_count decrement (allow 0 instead of minimum 1)
    await pool.query(
      `UPDATE customers 
       SET address_count = GREATEST(address_count - 1, 0), updated_at = now()
       WHERE id = $1`,
      [customerId]
    );

    res.json({ message: "🗑️ Address deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete address" });
  }
});


// ========================
// Special Requirement: Check if customer has only one address
// ========================
app.get("/customers/:id/address-status", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT COUNT(*) FROM addresses WHERE customer_id=$1", [id]);
    const count = parseInt(result.rows[0].count, 10);
    res.json({ customer_id: id, status: count === 1 ? "Only One Address" : "Multiple Addresses" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to check address status" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});