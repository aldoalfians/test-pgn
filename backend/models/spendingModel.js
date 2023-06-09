const Spending = `CREATE TABLE Spending 
(   
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employeeId INT,
    date DATE,
    value INT,
    FOREIGN KEY (employeeId) REFERENCES Employee(id)
)`;

export default Spending;
