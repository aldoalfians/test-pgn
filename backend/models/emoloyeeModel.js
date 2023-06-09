const Employee = `CREATE TABLE Employee 
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT(50),
    departemenId INT,
    FOREIGN KEY (departemenId) REFERENCES Departemen(id)
)`;

export default Employee;
