import queryAsync from "../utils/queryAsync.js";

export const getSpending = async (req, res) => {
  try {
    const querySpending =
      "SELECT s.id, s.employeeId, s.`date`, s.value, e.name FROM Spending s  LEFT JOIN Employee e  ON s.employeeId = e.id";

    const response = await queryAsync(querySpending);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSpendingById = async (req, res) => {
  const spendingId = req.params.id;
  try {
    const queryEmployee =
      "SELECT s.id, s.employeeId, s.`date`, s.value, e.name FROM Spending s  LEFT JOIN Employee e  ON s.employeeId = e.id WHERE s.id = ?";

    const response = await queryAsync(queryEmployee, [spendingId]);
    res.status(200).json(response[0]);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSpending = async (req, res) => {
  const { employeeId, date, value } = req.body;
  try {
    const querySpending =
      "INSERT INTO Spending (employeeId, date, value) VALUES (?,?,?)";
    await queryAsync(querySpending, [employeeId, date, value]);

    res.status(201).json({ message: "created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateSpending = async (req, res) => {
  const spendingId = req.params.id;
  const { employeeId, date, value } = req.body;
  try {
    const querySpending =
      "UPDATE Spending SET employeeId = ?, date = ?, value = ? WHERE id = ?";
    await queryAsync(querySpending, [employeeId, date, value, spendingId]);

    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteSpending = async (req, res) => {
  const SpendingId = req.params.id;
  try {
    const querySpending = "DELETE FROM Spending WHERE id = ?";
    await queryAsync(querySpending, [SpendingId]);

    res.status(200).json({ message: "delete successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getHome = async (req, res) => {
  try {
    const queryHome =
      "SELECT s.employeeId, s.`date`, s.value, e.name, d.id as departementId, d.name as departement FROM Spending s  LEFT JOIN Employee e  ON s.employeeId = e.id LEFT JOIN Departemen d  ON e.departemenId  = d.id";

    const response = await queryAsync(queryHome);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
