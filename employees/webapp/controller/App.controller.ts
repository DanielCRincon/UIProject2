import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";

/**
 * @namespace com.edgelabsdev.employees.controller
 */
export default class App extends BaseController {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.viewModel();
    }

    private viewModel () : void {
        const data = {
            layout: "OneColumn"
        };
        const model = new JSONModel(data);
        this.setModel(model, "view");
    }

    private loadEmployees () : void {
        const model = new JSONModel();
        model.loadData("../model/Employees.json");
        this.setModel(model, "employees"); 
    }
}