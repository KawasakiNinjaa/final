import React from "react";
import axios from "./axios";
import BioEditor from "./bioeditor";
import { shallow } from "enzyme";
import jest from "jest";

jest.mock("./axios");

test("if there is no bio, add bio option is rendered", () => {
    const wrapper = shallow(<BioEditor />);

    expect(wrapper.find(".bioeditor")).toContain("addbio");
});

test("if a bio is passed, edit bio option is rendered", () => {
    const wrapper = shallow(<BioEditor bio="bio" />);

    expect(wrapper.find(".bioeditor")).toContain("addbio");
});
