

describe('Axios Test Suite', () => {

  const cds = require("@sap/cds")

  /**
   * @type {{axios:import("axios").AxiosInstance}}
   */
  const { axios } = cds.test('.').in(__dirname, "..")
  axios.defaults.validateStatus = () => true;

  it('should support get metadata', async () => {
    const response = await axios.get("/class/$metadata")
    expect(response.status).toBe(200)
    expect(response.data).toMatch(/Students/)
  });

  it('should support use the raw cds APIs', async () => {
    const ClassService = await cds.connect.to("ClassService")
    expect(ClassService).toBeInstanceOf(cds.Service)
    const student = await ClassService.run(SELECT.one.from("Students", 1))
    expect(student).toMatchObject({
      "age": 18,
      "id": 1,
      "name_first_name": null,
      "name_last_name": "s1",
      "name_middle_name": null,
      "weight": 59.2,
    })
    const dbStudent = await cds.run(SELECT.one.from("ClassService.Students", 1))
    expect(dbStudent).toMatchObject({
      "age": 18,
      "id": 1,
      "name_first_name": null,
      "name_last_name": "s1",
      "name_middle_name": null,
      "weight": 59.1, // care here
    })
  });



});