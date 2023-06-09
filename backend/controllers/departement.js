import queryAsync from "../utils/queryAsync.js";

export const getDepartement = async (req, res) => {
  try {
    const queryDepartement = "SELECT * FROM Departemen";

    const response = await queryAsync(queryDepartement);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDepartementById = async (req, res) => {
  const departementId = req.params.id;
  try {
    const queryDepartement = "SELECT * FROM Departemen WHERE id = ?";

    const response = await queryAsync(queryDepartement, [departementId]);
    res.status(200).json(response[0]);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createDepartement = async (req, res) => {
  const { name } = req.body;
  try {
    const queryDepartement = "INSERT INTO Departemen (name) VALUES (?)";
    await queryAsync(queryDepartement, [name]);

    res.status(201).json({ message: "created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateDepartement = async (req, res) => {
  const departementId = req.params.id;
  const { name } = req.body;
  try {
    const queryDepartement = "UPDATE Departemen SET name = ? WHERE id = ?";
    await queryAsync(queryDepartement, [name, departementId]);

    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteDepartement = async (req, res) => {
  const departementId = req.params.id;
  try {
    const queryDepartement = "DELETE FROM Departemen WHERE id = ?";
    await queryAsync(queryDepartement, [departementId]);

    res.status(200).json({ message: "delete successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
