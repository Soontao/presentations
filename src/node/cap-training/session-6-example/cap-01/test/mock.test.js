
const cds = require("@sap/cds")

const path = require("path")

describe('Mock Test Suite', () => {

  const mockDb = cds.db = new cds.Service('db') // mock service

  const run = mockDb.run = jest.fn()

  beforeEach(() => {
    run.mockClear()
  })


  /**
   * 
   * @returns {Promise<import("@sap/cds/apis/services").Service>}
   */
  const connectToService = () => cds.connect.to("ImportantService", {
    impl: cds.ApplicationService,
    model: path.join(__dirname, "../srv/ImportantService.cds")
  });

  it('should support connect to ImportantService', async () => {
    const s = await connectToService()
    expect(s).toBeInstanceOf(cds.ApplicationService)

  });

  it('should support insert data', async () => {
    const s = await connectToService()
    const result = await s.run(INSERT.into("Table3s").entries({ ID: '651db316-edfa-11ec-8ea0-0242ac120002', c1: "v1" }))
    expect(result).toMatchSnapshot() // check snapshot at __snapshots__ folder
  });

  it('should support soft deletion', async () => {
    const s = await connectToService()
    await s.run(DELETE.from("Table3s", '651db316-edfa-11ec-8ea0-0242ac120002'))
    expect(run.mock.calls).toMatchSnapshot() // check snapshot at __snapshots__ folder
  });


});