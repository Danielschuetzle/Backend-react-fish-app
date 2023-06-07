import { useState } from 'react';
import { mutate } from 'swr';
import { StyledForm, StyledHeading, StyledLabel } from "./ProductForm.styled";
import { StyledButton } from "../Button/Button.styled";

export default function ProductForm() {
  // Using React's useState hook to manage the loading state
  const [loading, setLoading] = useState(false);

  // This async function handles the form submission event
  async function handleSubmit(event) {
    // Prevents the page from reloading upon form submission
    event.preventDefault();

    // Retrieves form data and converts it to a key-value object
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    // Indicate that loading has started
    setLoading(true);

    try {
      // Makes a POST request to add a new product
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData), // Sends product data as JSON
      });

      // If response is not ok (status not 2xx), throw an error
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Once new data is added, call mutate to revalidate the data from the SWR cache
      mutate('/api/products');
      
    } catch (error) {
      // If there's an error, log it to the console
      console.error('Failed to add product:', error);
    } finally {
      // Whether the request succeeded or failed, indicate that loading has finished
      setLoading(false);
    }
  }

  // The return statement defines the component's UI
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledHeading>Add a new Fish</StyledHeading>
      <StyledLabel htmlFor="name">
        Name:
        <input type="text" id="name" name="name" />
      </StyledLabel>
      <StyledLabel htmlFor="description">
        Description:
        <input type="text" id="description" name="description" />
      </StyledLabel>
      <StyledLabel htmlFor="price">
        Price:
        <input type="number" id="price" name="price" min="0" />
      </StyledLabel>
      <StyledLabel htmlFor="currency">
        Currency:
        <select id="currency" name="currency">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </StyledLabel>
      <StyledButton type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Submit'} {/* Shows 'Loading...' if loading, else 'Submit' */}
      </StyledButton>
      </StyledForm>
  );
}
