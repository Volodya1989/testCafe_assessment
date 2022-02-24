import { fixture, Selector } from "testcafe";
import axios from "axios";



fixture `Testing API Request` 
        .page`http://localhost:3001/`

test("Test 1", async (t) => {
  //    // expected test data
  // const devicesToCompare = [
  //   {
  //     id: "Th3ngERn9",
  //     system_name: "MAC-LEADER",
  //     type: "MAC",
  //     hdd_capacity: "2048",
  //   },
  //   {
  //     id: "Q1JdBnE12",
  //     system_name: "ARMANDO-SERVER",
  //     type: "WINDOWS_SERVER",
  //     hdd_capacity: "256",
  //   },
  //   {
  //     id: "e7ocoQ2n3",
  //     system_name: "MIGUEL-PC",
  //     type: "WINDOWS_WORKSTATION",
  //     hdd_capacity: "500",
  //   },
  //   {
  //     id: "Jj5bn3G2H",
  //     system_name: "FIRST-MAC",
  //     type: "MAC",
  //     hdd_capacity: "180",
  //   },
  //   {
  //     id: "GT556QGnk",
  //     system_name: "GOOD-MAC",
  //     type: "MAC",
  //     hdd_capacity: "500",
  //   },
  //   {
  //     id: "ab1coL2n9",
  //     system_name: "GILBERT-COMPUTER",
  //     type: "WINDOWS_WORKSTATION",
  //     hdd_capacity: "750",
  //   },
  //   {
  //     id: "LM5dBnJ2G",
  //     system_name: "MOON-SMART",
  //     type: "WINDOWS_SERVER",
  //     hdd_capacity: "256",
  //   },
  //   {
  //     id: "Up5bcEQp4",
  //     system_name: "JULIO-MAC-LOCAL",
  //     type: "MAC",
  //     hdd_capacity: "512",
  //   },
  // ];

  // GET request for devices
  const getDevices = await axios.get('http://localhost:3000/devices');
  const res = getDevices.data;
  const devicesCountAPI = res.length;

  //common class
  const listOfDevices = "div.list-devices";

  //selectors
  const devicesName = Selector(listOfDevices).find("span.device-name");
  const devicesType = Selector(listOfDevices).find("span.device-type");
  const devicesCapacity = Selector(listOfDevices).find("span.device-capacity");
  const devicesEditButton = Selector(listOfDevices).find("a.device-edit");
  const devicesDeleteButton = Selector(listOfDevices).find("a.device-delete");

 //count of devices present on UI
    await  t.expect(devicesName.length).eql(devicesCountAPI);


  for (var i = 0; i < devicesName.length; i++) {
    //	Use the list of devices to check the elements are visible in the DOM///not so neccessary
    await t.expect(devicesName.nth(i).visible).ok();
    await t.expect(devicesType.nth(i).visible).ok();
    await t.expect(devicesCapacity.nth(i).visible).ok();

    // vefiy text is displayed
    await t.expect(devicesName.nth(i).innerText).eql(res.system_name[i]);
    await t.expect(devicesType.nth(i).innerText).eql(res.type[i]);
    await t.expect(devicesCapacity.nth(i).innerText).eql(res.hdd_capacity[i]);

    //	Verify that all devices contain the edit and delete buttons
    await t.expect(devicesEditButton.nth(i).withExactText("EDIT").visible).ok();
    await t.expect(devicesDeleteButton.nth(i).withExactText("DELETE").visible).ok();
  }
});
