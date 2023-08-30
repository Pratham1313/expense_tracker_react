import "./styles.css";
import { useState } from "react";

export default function App() {
  const [expense_list, setexpense_list] = useState([]);
  const [income, setincome] = useState("");
  const [income_submit, Setincome_submit] = useState(false);
  const [spent, setspent] = useState([]);

  function add_item(item) {
    setexpense_list((expense_list) => [...expense_list, item]);
  }
  function deleting(id) {
    setexpense_list(expense_list.filter((item) => item.id !== id));
  }

  return (
    <div className="App">
      <Header />
      <Input
        income={income}
        setincome={setincome}
        income_submit={income_submit}
        Setincome_submit={Setincome_submit}
      />
      <Tracker
        expense_list={expense_list}
        income={income}
        income_submit={income_submit}
        Setincome_submit={Setincome_submit}
        spent={spent}
        setspent={setspent}
      />
      <Addexpense income_submit={income_submit} add_item={add_item} />
      <Displayexpense
        expense_list={expense_list}
        setexpense_list={setexpense_list}
        deleting={deleting}
      />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Expense Tracker</h1>
    </header>
  );
}

function Input({ income, setincome, income_submit, Setincome_submit }) {
  function handle_submit(e) {
    e.preventDefault();
    //if (!description) return;
    if (!income) return;
    Setincome_submit(true);
  }

  return (
    <div
      className={
        income_submit === false || income_submit === 1
          ? "income_notsubmitted"
          : "income_submitted"
      }
    >
      <form onSubmit={handle_submit} className="incomeee">
        <input
          type="number"
          placeholder="Enter monthly income..."
          value={income}
          onChange={(e) => setincome(e.target.value)}
        ></input>
        <button className="submit">Submit</button>
      </form>
    </div>
  );
}

function Tracker({
  income,
  income_submit,
  spent,
  expense_list,
  Setincome_submit
}) {
  if (income_submit === true || income_submit === 1) {
    let spentt = 0;
    spent = [];
    const len = expense_list.length;
    expense_list.map((item) => spent.push(item.expense));
    for (let i = 0; i < len; i++) {
      spentt += Number(spent[i]);
    }
    function change_income() {
      Setincome_submit(1);
    }
    return (
      <div className="tracker">
        <div className="display">
          <div className="stat">
            <p>INCOME</p>
            <p>{income}</p>
          </div>
          <div className="stat">
            <p>SPENT</p>
            <p>{spentt}</p>
          </div>
          <div
            className={
              Number(income) - spentt > 0 ? "stat_positive" : "stat_negative"
            }
          >
            <p>TOTAL SAVING</p>
            <p>{income - spentt}</p>
          </div>
        </div>
        <div>
          <button className="change_income" onClick={change_income}>
            Change Income
          </button>
        </div>
      </div>
    );
  }
}

function Addexpense({ income_submit, add_item }) {
  const [expense, setexpense] = useState("");
  const [expense_name, setexpense_name] = useState("");
  const [date, setdate] = useState("");

  if (income_submit === true || income_submit === 1) {
    function handle_esubmit(e) {
      e.preventDefault();
      const list = { expense_name, expense, id: Date.now(), date };
      if (!expense_name) return;
      if (!expense) return;
      add_item(list);
      setexpense("");
      setexpense_name("");
    }
    return (
      <form onSubmit={handle_esubmit}>
        <input
          type="text"
          placeholder="Enter expense name..."
          value={expense_name}
          onChange={(e) => {
            setexpense_name(e.target.value);
          }}
        ></input>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setdate(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Enter expense value..."
          value={expense}
          onChange={(e) => {
            setexpense(e.target.value);
          }}
        ></input>
        <button className="change_incomee"> Add </button>
      </form>
    );
  }
}

function Displayexpense({ expense_list, setexpense_list, deleting }) {
  const len = expense_list.length;
  if (len >= 1) {
    return (
      <div className="display_list">
        <ul className="show">
          {expense_list.map((item) => (
            <Item
              item={item}
              setexpense_list={setexpense_list}
              expense_list={expense_list}
              deleting={deleting}
              key={item.id}
            />
          ))}
        </ul>
      </div>
    );
  }
}

function Item({ item, deleting }) {
  return (
    <li>
      <div className="ull">
        <span>{item.expense_name}</span>
        <span>{item.date}</span>
        <span>{item.expense}</span>
        <button className="delete_button" onClick={() => deleting(item.id)}>
          x
        </button>
      </div>
    </li>
  );
}
