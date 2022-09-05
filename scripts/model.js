
class ElectricDecoration {
  
    constructor(
    name, //String
    material, //String
    usage, //String
    amountAvalaible, //Integer
    colors, //String
    length, //Float
    lampsPerMeter, //Integer
    power, //Integer
    price //Float
  ) {
    this.name = name;
    this.material = material;
    this.usage = usage;
    this.amount_avalaible = amountAvalaible;
    this.colors = colors;
    this.length = length;
    this.lamps_per_meter = lampsPerMeter;
    this.power = power;
    this.price = price;
  }

  //Translate object and format usage
  getEntries() {
    let obj = Object.assign({}, this);
    obj["usage"] = this.usage.toLowerCase().replace("_"," ");
    return Object.entries(obj);
  }
}
