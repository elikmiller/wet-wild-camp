import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import chai, { should } from "chai";
import chaiEnzyme from "chai-enzyme";

chai.use(chaiEnzyme());
should();
configure({ adapter: new Adapter() });

window.Modernizr = {};
