<script>
  import axios from "axios";

  export let location = undefined;

  let countryName = "";
  let loading = false;
  let error = undefined;
  let countryData = [];

  async function getCountryData() {
    try {
      error = undefined;
      if (countryName !== "") {
        loading = true;
        const response = await axios.post(`/countries/${countryName}`);
        if (response.status === 200) {
          if (response.data?.error) {
            console.log("enter error");
            throw new Error(response.data.error);
          } else if (response.data.data?.status) {
            console.log("enter status");
            throw new Error(
              `${response.data.data.status} ${response.data.data.message}`
            );
          } else {
            console.log("enter data");
            countryData = response.data.data;
          }
        }
      }
    } catch (err) {
      console.log(err);
      error = err;
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={getCountryData}>
  <p>Type the name of a country</p>
  <input bind:value={countryName} />
  <button>Search</button>
</form>
<br />
<br />
{#if countryData}
  {#each countryData as country (country.numericCode)}
    <div class="country">
      <p class="p-card">Name: {country.name}</p>
      <p class="p-card">Native Name: {country.nativeName}</p>
      <p class="p-card">Demonym: {country.demonym}</p>
      <p class="p-card">Flag:</p>
      <img class="img" src={country.flag} alt="Flag" />
    </div>
  {/each}
{/if}
{#if loading}
  Loading...
{/if}
{#if error}
  <div>
    <p>{error}</p>
  </div>
{/if}

<style>
  .img {
    height: 10rem;
    width: 20rem;
  }

  .country {
    padding-bottom: 3rem;
    height: 100%;
    width: 50rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .p-card {
    margin-top: 2rem;
    margin-left: 2rem;
  }
</style>
