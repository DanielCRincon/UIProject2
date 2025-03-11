import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Input from "sap/m/Input";
import ComboBox from "sap/m/ComboBox";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Table from "sap/m/Table";
import ListBinding from "sap/ui/model/ListBinding";
import { FilterBar$ClearEvent } from "sap/ui/comp/filterbar/FilterBar";
import Control from "sap/ui/core/Control";

/**
 * @namespace com.edgelabsdev.employees.controller
 */
export default class Main extends BaseController {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.loadEmployees();
        this.loadCountries();
    }

    private loadEmployees () : void {
        const model = new JSONModel();
        model.loadData("../model/Employees.json");
        this.setModel(model, "employees"); 
    }

    private loadCountries () : void {
        const model = new JSONModel();
        model.loadData("../model/Countries.json");
        this.setModel(model, "countries"); 
    }

    public onFilterSearch () : void {

        let oInput = this.byId("filterEmployee") as Input,
            sEmployee = oInput.getValue();
        let oComboBox = this.byId("filterCountry") as ComboBox,
            sCountry = oComboBox.getSelectedKey();

        let aFilters = [];

        if (sEmployee) {
            aFilters.push(
                new Filter({
                    filters: [
                        new Filter("FirstName", FilterOperator.Contains, sEmployee),
                        new Filter("LastName", FilterOperator.Contains, sEmployee)
                    ],
                    and: false
                })
            );
        }

        if (sCountry) {
            aFilters.push(new Filter("Country", FilterOperator.EQ, sCountry))
        }

        const oTable = this.byId("table") as Table;
        const items = oTable.getBinding("items") as ListBinding;
        items.filter(aFilters);
    }

    public onClearPress (event: FilterBar$ClearEvent) : void {
        const controls = event.getParameter("selectionSet") as Control[];
        const oInput = controls[0] as Input;
        const oComboBox = controls[1] as ComboBox;
        oInput.setValue("");
        oComboBox.setSelectedKey("");
        this.onFilterSearch();
    }

}

