import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import portionService from "../../services/portionServices";
import ReactDatePicker from "react-datepicker";
import "./foodlist.scss";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jul",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Food = (props) => (
  <tr>
    {/* <td className="nameCell">{props.food.email}</td> */}
    <td>{props.food.food}</td>
    <td>{props.food.amount}</td>
    <td>
      {days[new Date(props.food.date).getDay()] +
        " " +
        new Date(props.food.date).getDate() +
        ". " +
        months[new Date(props.food.date).getMonth()] +
        " " +
        new Date(props.food.date).getFullYear()}
    </td>
    {/* <td>{props.food.date.substring(0, 10)}</td> */}
    <td>{Math.round(props.food.energy)}</td>
    <td>{Math.round(props.food.carbohydrate)}</td>
    <td>{Math.round(props.food.protein)}</td>
    <td>{Math.round(props.food.fat)}</td>
    <td>
      <Link style={{ color: "#242731" }} to={"/edit/" + props.food._id}>
        muokkaa
      </Link>{" "}
      |{" "}
      <button
        style={{ color: "#242731" }}
        onClick={() => {
          props.deleteFood(props.food._id);
        }}
      >
        {" "}
        x
      </button>
    </td>
  </tr>
);

export default class FoodsList extends Component {
  constructor(props) {
    super(props);

    this.deleteFood = this.deleteFood.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      foods: [],
      date: new Date(),
    };
  }

  componentDidMount() {
    const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
    axios
      .get("http://localhost:5000/foods")
      .then((response) => {
        this.setState({
          foods: response.data.filter(
            (element) => element.email === loggedUser.email
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteFood(id) {
    portionService.remove(id);
    this.setState({
      foods: this.state.foods.filter((element) => element._id !== id),
    });
  }

  foodList() {
    var tempFoods;
    if (this.state.date) {
      tempFoods = this.state.foods.filter(
        (food) =>
          new Date(food.date).getFullYear() === this.state.date.getFullYear() &&
          new Date(food.date).getMonth() === this.state.date.getMonth() &&
          new Date(food.date).getDate() === this.state.date.getDate()
      );
    } else {
      tempFoods = this.state.foods;
    }
    return tempFoods.map((currentfood) => {
      return (
        <Food
          food={currentfood}
          deleteFood={this.deleteFood}
          key={currentfood._id}
        />
      );
    });
  }

  foodListTotals() {
    var tempFoods;
    if (this.state.date) {
      tempFoods = this.state.foods.filter(
        (food) =>
          new Date(food.date).getFullYear() === this.state.date.getFullYear() &&
          new Date(food.date).getMonth() === this.state.date.getMonth() &&
          new Date(food.date).getDate() === this.state.date.getDate()
      );
    } else {
      tempFoods = this.state.foods;
    }
    let totalAmount = 0;
    let totalEnergy = 0;
    let totalProtein = 0;
    let totalCarbohydrate = 0;
    let totalFat = 0;
    tempFoods.forEach((food) => {
      totalAmount += food.amount;
      totalEnergy += food.energy;
      totalProtein += food.protein;
      totalCarbohydrate += food.carbohydrate;
      totalFat += food.fat;
    });
    return (
      <tr>
        <td></td>
        <td>{totalAmount}</td>
        <td></td>
        <td>{Math.round(totalEnergy)}</td>
        <td>{Math.round(totalCarbohydrate)}</td>
        <td>{Math.round(totalProtein)}</td>
        <td>{Math.round(totalFat)}</td>
      </tr>
    );
  }

  handleDateChange(date) {
    this.setState({
      date: date,
    });
  }

  render() {
    return (
      <div className="foodList">
        <div className="foodListHeader">
          <h3>Kirjatut annokset</h3>
          <ReactDatePicker
            className="amountInput"
            selected={this.state.date}
            onChange={this.handleDateChange}
            dateFormat="dd/MM/yyyy"
          />
          <button
            className="btn"
            onClick={() => this.setState({ date: new Date() })}
          >
            Tänään
          </button>
          <button
            className="btn"
            onClick={() =>
              this.setState({
                date: new Date(new Date().setDate(new Date().getDate() - 1)),
              })
            }
          >
            Eilen
          </button>
          <button
            className="btn"
            onClick={() =>
              this.setState({
                date: "",
              })
            }
          >
            Kaikki
          </button>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              {/* <th>User</th> */}
              <th>Ruoka</th>
              <th>Määrä (g)</th>
              <th>Pvm</th>
              <th>Energia (kCal)</th>
              <th>Hiilihydraatti (g)</th>
              <th>Proteiini (g)</th>
              <th>Rasva (g)</th>
              <th>Toiminnot</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{this.foodList()}</tbody>
          <tfoot>
            <tr>
              {/* <th></th> */}
              <th>Yhteensä</th>
              <th>Määrä</th>
              <th></th>
              <th>Energia</th>
              <th>Hiilihydraatti</th>
              <th>Proteiini</th>
              <th>Rasva</th>
            </tr>
            {this.foodListTotals()}
          </tfoot>
        </table>
      </div>
    );
  }
}
