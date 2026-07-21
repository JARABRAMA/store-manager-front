import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CreateNewProductForm } from "../../../../../app/presentation/products/create/components/CreateNewProductForm";

describe("Create new product component", () => {
  it("should show error when name has more than 50 characters", async () => {
    render(<CreateNewProductForm />);

    const nameInput = screen.getByTestId("input-name");
    const form = screen.getByTestId("form");

    fireEvent.input(nameInput, {
      target: {
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    });
    fireEvent.submit(form);

    await waitFor(() =>
      expect(screen.queryByTestId("input-error-name")).toBeInTheDocument(),
    );

    expect(screen.getByTestId("input-error-name")).toBeInTheDocument();
    expect(
      screen.getByText(
        "El nombre del producto debe tener 50 caracteres o menos",
      ),
    ).toBeInTheDocument();
  });

  it("should advice to the user that name cannot be void when name input is void", async () => {
    render(<CreateNewProductForm />);

    const form = screen.getByTestId("form");
    const nameInput = screen.getByTestId("input-name");

    await act(async () =>
      fireEvent.input(nameInput, { target: { value: "" } }),
    );

    await act(async () => fireEvent.submit(form));

    await waitFor(() =>
      expect(screen.queryByTestId("input-error-name")).toBeInTheDocument(),
    );

    expect(
      screen.getByText("El nombre del producto no puede estar vacio"),
    ).toBeInTheDocument();
  });

  it("should advice user that product name should has 3 or more characters", async () => {
    render(<CreateNewProductForm />);

    const nameInput = screen.getByTestId("input-name");

    await act(async () =>
      fireEvent.input(nameInput, { target: { value: "so" } }),
    );

    const form = screen.getByTestId("form");

    await act(async () => fireEvent.submit(form));

    await waitFor(() =>
      expect(screen.queryByTestId("input-error-name")).toBeInTheDocument(),
    );

    expect(
      screen.getByText(
        "El nombre del producto debe tener al menos 3 caracteres",
      ),
    );
  });

  it("should advice the user that stock and price should be numbers", async () => {
    render(<CreateNewProductForm />);

    const stockInput = screen.getByTestId("input-stock");
    const priceInput = screen.getByTestId("input-price");

    const form = screen.getByTestId("form");

    await act(async () => {
      fireEvent.input(stockInput, { target: { value: "alphanumeric1234" } });
      fireEvent.input(priceInput, { target: { value: "alphanumeric4321" } });
      fireEvent.submit(form);
    });

    await waitFor(async () => {
      expect(screen.getByTestId("input-error-stock")).toBeInTheDocument();
      expect(screen.getByTestId("input-error-price")).toBeInTheDocument();
    });

    expect(screen.getByText("El precio del producto debe ser un número"));
    expect(
      screen.getByText(
        "Las unidades disponibles del producto deben ser un número",
      ),
    );
  });

  it("should advice the user that stock and price should be a number bigger or equals to cero", async () => {
    render(<CreateNewProductForm />);

    const stockInput = screen.getByTestId("input-stock");
    const priceInput = screen.getByTestId("input-price");

    const form = screen.getByTestId("form");

    await act(async () => {
      fireEvent.input(stockInput, { target: { value: "-123" } });
      fireEvent.input(priceInput, { target: { value: "-321" } });
      fireEvent.submit(form);
    });

    await waitFor(async () => {
      expect(screen.getByTestId("input-error-stock")).toBeInTheDocument();
      expect(screen.getByTestId("input-error-price")).toBeInTheDocument();
    });

    expect(
      screen.getByText("El precio del producto debe ser mayor a 100 pesos"),
    );
    expect(
      screen.getByText(
        "Las unidades disponibles del producto deben ser cero o mayores que cero",
      ),
    );
  });

  it("should advice the user that stock and price cannot be void", async () => {
    render(<CreateNewProductForm />);
    const form = screen.getByTestId("form");

    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(async () => {
      expect(screen.getByTestId("input-error-stock")).toBeInTheDocument();
      expect(screen.getByTestId("input-error-price")).toBeInTheDocument();
    });

    expect(screen.getByText("El precio del producto no puede ser vacío"));
    expect(screen.getByText("Las unidades disponibles no pueden estar vacías"));
  });

  it("should advice to the user that description should not overcomes the 100 characters", async () => {
    render(<CreateNewProductForm />);

    const descriptionInput = screen.getByTestId("input-description");
    const form = screen.getByTestId("form");

    await act(async () => {
      fireEvent.input(descriptionInput, {
        target: {
          value:
            "Currently, the result of z.string() validation of an empty string  leads to a pass instead of a fail, even though the field itself is required.This is not documented anywhere except github issues and apparently an old changelog, but it is not very intuitive in some cases and leads to potential issues especially when trying to validate forms https://languageto ol.org/e ditor/55464871 nI'd like to have a waitForTime() utlity function that would wait a specified amount of time before proceeding with the next lines of code The default mutationObserverOptions is {subtree: true, childList: true, attributes: true, characterData: true} which detects additions and removals of child elements (including text nodes) in the container and any of its descendants. It also detects attribute changes. When any of those changes occur, it re-runs the callback",
        },
      });
      fireEvent.submit(form);
    });

    await waitFor(() =>
      expect(screen.getByTestId("input-error-description")).toBeInTheDocument(),
    );

    expect(
      screen.getByText(
        "La descripción del producto no puede superar los 100 caracteres",
      ),
    );
  });

  it("should advice that image url format is invalid", async () => {
    render(<CreateNewProductForm />);

    const imageInput = screen.getByTestId("input-imageUrl");
    const form = screen.getByTestId("form");

    await act(async () => {
      fireEvent.input(imageInput, { target: { input: "image-url invalid" } });
      fireEvent.submit(form)
    });

    await waitFor(() => expect(screen.queryByTestId('input-error-imageUrl')))

    expect(screen.getByTestId('La URL de la imagen no tiene un formato válido'))
  });
});
