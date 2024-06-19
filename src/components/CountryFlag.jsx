/* eslint-disable react/prop-types */
const CountryFlag = ({ countryCode }) => {
  return (
    <img
      src={`https://flagsapi.com/${countryCode}/flat/64.png`}
      alt={countryCode}
    />
  );
};

export default CountryFlag;
