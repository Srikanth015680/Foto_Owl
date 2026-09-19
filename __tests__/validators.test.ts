import {
  hasErrors,
  validateLoginForm,
  validateProfileForm,
  validateRegisterForm,
} from "../src/utils/validators";

import {
  LoginFormValues,
  ProfileFormValues,
  RegisterFormValues,
} from "../src/types";

const validRegisterValues: RegisterFormValues = {
  fullName: "Jane Doe",
  email: "jane@example.com",
  gender: "Female",
  mobileNumber: "9876543210",
  address: "123 Main St",
  city: "Hyderabad",
  password: "secret1",
  confirmPassword: "secret1",
};

describe("Register validation", () => {
  it("accepts valid registration data", () => {
    expect(hasErrors(validateRegisterForm(validRegisterValues))).toBe(false);
  });

  it("rejects an invalid email", () => {
    const errors = validateRegisterForm({
      ...validRegisterValues,
      email: "invalid-email",
    });

    expect(errors.email).toBeDefined();
  });

  it("rejects a mobile number with less than 10 digits", () => {
    const errors = validateRegisterForm({
      ...validRegisterValues,
      mobileNumber: "12345",
    });

    expect(errors.mobileNumber).toBeDefined();
  });

  it("rejects a mobile number containing letters", () => {
    const errors = validateRegisterForm({
      ...validRegisterValues,
      mobileNumber: "98765abc10",
    });

    expect(errors.mobileNumber).toBeDefined();
  });

  it("rejects a password shorter than 6 characters", () => {
    const errors = validateRegisterForm({
      ...validRegisterValues,
      password: "abc",
      confirmPassword: "abc",
    });

    expect(errors.password).toBeDefined();
  });

  it("rejects mismatched passwords", () => {
    const errors = validateRegisterForm({
      ...validRegisterValues,
      confirmPassword: "different",
    });

    expect(errors.confirmPassword).toBeDefined();
  });

  it("requires gender", () => {
    const errors = validateRegisterForm({
      ...validRegisterValues,
      gender: null,
    });

    expect(errors.gender).toBeDefined();
  });

  it("requires a full name", () => {
    const errors = validateRegisterForm({
      ...validRegisterValues,
      fullName: "",
    });

    expect(errors.fullName).toBeDefined();
  });

  it("requires an address", () => {
    const errors = validateRegisterForm({
      ...validRegisterValues,
      address: "",
    });

    expect(errors.address).toBeDefined();
  });
});

describe("Login validation", () => {
  it("accepts valid login data", () => {
    const values: LoginFormValues = {
      email: "jane@example.com",
      password: "secret1",
    };

    expect(hasErrors(validateLoginForm(values))).toBe(false);
  });

  it("requires email and password", () => {
    const errors = validateLoginForm({
      email: "",
      password: "",
    });

    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
  });
});

describe("Profile validation", () => {
  const validProfile: ProfileFormValues = {
    fullName: "Jane Doe",
    mobileNumber: "9876543210",
    gender: "Female",
    address: "123 Main St",
    city: "Hyderabad",
  };

  it("accepts valid profile data", () => {
    expect(hasErrors(validateProfileForm(validProfile))).toBe(false);
  });

  it("requires a city", () => {
    const errors = validateProfileForm({
      ...validProfile,
      city: "",
    });

    expect(errors.city).toBeDefined();
  });

  it("rejects an invalid mobile number", () => {
    const errors = validateProfileForm({
      ...validProfile,
      mobileNumber: "123",
    });

    expect(errors.mobileNumber).toBeDefined();
  });
});