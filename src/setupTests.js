import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { should } from "chai";

should();
configure({ adapter: new Adapter() });
