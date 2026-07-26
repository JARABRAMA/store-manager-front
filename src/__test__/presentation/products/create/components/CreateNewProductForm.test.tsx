import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCases } from "../../../../../app/di";
import { CreateNewProductForm } from "../../../../../app/presentation/products/create/components/CreateNewProductForm";
import { ServerErrorException } from "../../../../../app/domain/exceptions/ServerErrorException";

vi.mock("../../../../../app/di", () => ({
  useCases: {
    saveProductUseCase: vi.fn(),
  },
}));

const mockSaveProductUseCase = vi.mocked(useCases.saveProductUseCase);

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

  it("success dialog should be hided when no success message", () => {
    render(<CreateNewProductForm />);
    const dialog = screen.getByTestId("simple-dialog");

    expect(dialog).toBeInTheDocument();
    expect(dialog).not.toHaveAttribute("open", "");
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

  it("should advise to user that description should contains at least 5 words", async () => {
    render(<CreateNewProductForm />);

    const form = screen.getByTestId("form");
    const descriptionInput = screen.getByTestId("input-description");

    await act(async () => {
      fireEvent.input(descriptionInput, {
        target: { value: "less than 5 words" },
      });
      fireEvent.submit(form);
    });

    await waitFor(() =>
      expect(screen.getByTestId("input-error-description")).toBeInTheDocument(),
    );

    expect(
      screen.getByText(
        "La descripción del producto debe contener al menos 5 palabras",
      ),
    ).toBeInTheDocument();
  });

  it("should advice that image url format is invalid", async () => {
    render(<CreateNewProductForm />);

    const imageInput = screen.getByTestId("input-imageUrl");
    const form = screen.getByTestId("form");

    await act(async () => {
      fireEvent.input(imageInput, { target: { value: "image-url invalid" } });
      fireEvent.submit(form);
    });

    await waitFor(() => expect(screen.queryByTestId("input-error-imageUrl")));

    expect(screen.getByText("La URL de la imagen no tiene un formato válido"));
  });

  it("should not appear error message when description and category are void", async () => {
    render(<CreateNewProductForm />);

    const form = screen.getByTestId("form");

    await act(async () => {
      fireEvent.submit(form);
    });

    expect(
      screen.queryByTestId("input-error-description"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("input-error-imageUrl"),
    ).not.toBeInTheDocument();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should appear success message in a dialog when save product", async () => {
    const message = "saved product";
    mockSaveProductUseCase.mockResolvedValue(message);
    render(<CreateNewProductForm />);

    await act(async () => await submitValidProduct(screen));
    const successDialog = screen.queryByTestId("simple-dialog");
    await waitFor(() => expect(successDialog).toBeInTheDocument());

    expect(mockSaveProductUseCase).toHaveBeenCalledOnce();
    expect(successDialog).toHaveAttribute("open", "");
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("success dialog should be hided when click on on close dialog button", async () => {
    const message = "saved product";
    mockSaveProductUseCase.mockResolvedValue(message);
    render(<CreateNewProductForm />);

    await (async () => await submitValidProduct(screen));

    const closeButton = screen.getByTestId("close-button");
    const dialog = screen.getByTestId("simple-dialog");
    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(dialog).toBeInTheDocument();
    expect(dialog).not.toHaveAttribute("open");
  });

  it("should show error when server response with a error", async () => {
    const message = "product already exists";
    mockSaveProductUseCase.mockRejectedValue(new ServerErrorException(message));
    render(<CreateNewProductForm />);

    await act(async () => await submitValidProduct(screen))

    const errorForm = screen.getByTestId('form-error')
    expect(errorForm).toBeInTheDocument()
    expect(screen.getByText(message)).toBeInTheDocument()

  });

  const submitValidProduct = async (sc: typeof screen) => {
    // give a valid product
    const nameInput = sc.getByTestId("input-name");
    const priceInput = sc.getByTestId("input-price");
    const stockInput = sc.getByTestId("input-stock");
    const descriptionInput = sc.getByTestId("input-description");

    const form = sc.getByTestId("form");
    await act(async () => {
      // fill the inputs
      fireEvent.input(nameInput, { target: { value: "Fries Potatoes" } });
      fireEvent.input(stockInput, { target: { value: "21" } });
      fireEvent.input(priceInput, { target: { value: "2400" } });
      fireEvent.input(descriptionInput, {
        target: { value: "fires potatoes with lemon flavor 1000gr" },
      });

      // submit the form
      fireEvent.submit(form);
    });
  };

});
