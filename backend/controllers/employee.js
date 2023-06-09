import queryAsync from "../utils/queryAsync.js";

export const getEmployee = async (req, res) => {
  try {
    const queryEmployee =
      "SELECT e.id, e.name, e.departemenId, d.name as departement FROM Employee e LEFT JOIN Departemen d  ON e.departemenId  = d.id";

    const response = await queryAsync(queryEmployee);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const queryEmployee =
      "SELECT e.id, e.name, e.departemenId, d.name as departement FROM Employee e LEFT JOIN Departemen d  ON e.departemenId  = d.id WHERE e.id = ?";

    const response = await queryAsync(queryEmployee, [employeeId]);
    res.status(200).json(response[0]);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createEmployee = async (req, res) => {
  const { name, departemenId } = req.body;
  try {
    const queryEmployee =
      "INSERT INTO Employee (name, departemenId) VALUES (?,?)";
    await queryAsync(queryEmployee, [name, departemenId]);

    res.status(201).json({ message: "created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  const EmployeeId = req.params.id;
  const { name, departemenId } = req.body;
  try {
    const queryEmployee =
      "UPDATE Employee SET name = ?, departemenId = ? WHERE id = ?";
    await queryAsync(queryEmployee, [name, departemenId, EmployeeId]);

    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  const EmployeeId = req.params.id;
  try {
    const queryEmployee = "DELETE FROM Employee WHERE id = ?";
    await queryAsync(queryEmployee, [EmployeeId]);

    res.status(200).json({ message: "delete successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
