import { useEffect, useRef, useState } from 'react'
import "./home.css"
import { HiFilter } from 'react-icons/hi';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
const Home = () => {
  const [offSet,setOffSet] = useState(0);
  const [error,setError] = useState(null);
  const [data,setData] = useState([]);
  const [idSortDirection, setIdSortDirection] = useState('asc'); 
  const [nameSortDirection, setNameSortDirection] = useState('asc'); 
  const [hasMore , setHasMore] = useState(true);
  const [isLoading,setIsLoading] = useState(false);
  const tableBodyRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedGender, setSelectedGender] = useState('gender'); 
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (tableBodyRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableBodyRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          if (!isLoading && hasMore) {
            setOffSet(prevVal => prevVal + 10);
          }
        }
      }
    };

    const tableBodyElement = tableBodyRef.current;
    if (tableBodyElement) {
      tableBodyElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableBodyElement) {
        tableBodyElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading, hasMore]);

  useEffect(() => {
    const GetData = async () => {
      try {
        if (!hasMore || isLoading) return;
        setIsLoading(true);
        const response = await fetch(`https://dummyjson.com/users?skip=${offSet}&limit=10`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        if (offSet >= result.total) {
          setHasMore(false);
        } else {
          setData(prevData => [...prevData, ...result.users]);
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    GetData();
  }, [offSet]);

  // Filtering data based on the selected country
  useEffect(() => {
    const newFilteredData = selectedCountry === 'All'
      ? data
      : (data.filter(item => item.address.country === selectedCountry))

    setFilteredData(newFilteredData);
  }, [data, selectedCountry]);

  // Filtering data based on the selected gender
  useEffect(() => {
    const newFilteredData = selectedGender === 'gender'
      ? data
      : (data.filter(item => item.gender === selectedGender))

    setFilteredData(newFilteredData);
  }, [data, selectedGender]);

    const CountryNameMapping = 
      {
        "Afghanistan": "AFG",
        "Albania": "ALB",
        "Algeria": "DZA",
        "Andorra": "AND",
        "Angola": "AGO",
        "Antigua and Barbuda": "ATG",
        "Argentina": "ARG",
        "Armenia": "ARM",
        "Australia": "AUS",
        "Austria": "AUT",
        "Azerbaijan": "AZE",
        "Bahamas": "BHS",
        "Bahrain": "BHR",
        "Bangladesh": "BGD",
        "Barbados": "BRB",
        "Belarus": "BLR",
        "Belgium": "BEL",
        "Belize": "BLZ",
        "Benin": "BEN",
        "Bhutan": "BTN",
        "Bolivia": "BOL",
        "Bosnia and Herzegovina": "BIH",
        "Botswana": "BWA",
        "Brazil": "BRA",
        "Brunei": "BRN",
        "Bulgaria": "BGR",
        "Burkina Faso": "BFA",
        "Burundi": "BDI",
        "Cabo Verde": "CPV",
        "Cambodia": "KHM",
        "Cameroon": "CMR",
        "Canada": "CAN",
        "Central African Republic": "CAF",
        "Chad": "TCD",
        "Chile": "CHL",
        "China": "CHN",
        "Colombia": "COL",
        "Comoros": "COM",
        "Congo, Democratic Republic of the": "COD",
        "Congo, Republic of the": "COG",
        "Costa Rica": "CRI",
        "Croatia": "HRV",
        "Cuba": "CUB",
        "Cyprus": "CYP",
        "Czech Republic": "CZE",
        "Denmark": "DNK",
        "Djibouti": "DJI",
        "Dominica": "DMA",
        "Dominican Republic": "DOM",
        "East Timor": "TLS",
        "Ecuador": "ECU",
        "Egypt": "EGY",
        "El Salvador": "SLV",
        "Equatorial Guinea": "GNQ",
        "Eritrea": "ERI",
        "Estonia": "EST",
        "Eswatini": "SWZ",
        "Ethiopia": "ETH",
        "Fiji": "FJI",
        "Finland": "FIN",
        "France": "FRA",
        "Gabon": "GAB",
        "Gambia": "GMB",
        "Georgia": "GEO",
        "Germany": "DEU",
        "Ghana": "GHA",
        "Greece": "GRC",
        "Grenada": "GRD",
        "Guatemala": "GTM",
        "Guinea": "GIN",
        "Guinea-Bissau": "GNB",
        "Guyana": "GUY",
        "Haiti": "HTI",
        "Honduras": "HND",
        "Hungary": "HUN",
        "Iceland": "ISL",
        "India": "IND",
        "Indonesia": "IDN",
        "Iran": "IRN",
        "Iraq": "IRQ",
        "Ireland": "IRL",
        "Israel": "ISR",
        "Italy": "ITA",
        "Jamaica": "JAM",
        "Japan": "JPN",
        "Jordan": "JOR",
        "Kazakhstan": "KAZ",
        "Kenya": "KEN",
        "Kiribati": "KIR",
        "Korea, North": "PRK",
        "Korea, South": "KOR",
        "Kosovo": "XKX",
        "Kuwait": "KWT",
        "Kyrgyzstan": "KGZ",
        "Laos": "LAO",
        "Latvia": "LVA",
        "Lebanon": "LBN",
        "Lesotho": "LSO",
        "Liberia": "LBR",
        "Libya": "LBY",
        "Liechtenstein": "LIE",
        "Lithuania": "LTU",
        "Luxembourg": "LUX",
        "Madagascar": "MDG",
        "Malawi": "MWI",
        "Malaysia": "MYS",
        "Maldives": "MDV",
        "Mali": "MLI",
        "Malta": "MLT",
        "Marshall Islands": "MHL",
        "Mauritania": "MRT",
        "Mauritius": "MUS",
        "Mexico": "MEX",
        "Micronesia": "FSM",
        "Moldova": "MDA",
        "Monaco": "MCO",
        "Mongolia": "MNG",
        "Montenegro": "MNE",
        "Morocco": "MAR",
        "Mozambique": "MOZ",
        "Myanmar (Burma)": "MMR",
        "Namibia": "NAM",
        "Nauru": "NRU",
        "Nepal": "NPL",
        "Netherlands": "NLD",
        "New Zealand": "NZL",
        "Nicaragua": "NIC",
        "Niger": "NER",
        "Nigeria": "NGA",
        "North Macedonia": "MKD",
        "Norway": "NOR",
        "Oman": "OMN",
        "Pakistan": "PAK",
        "Palau": "PLW",
        "Panama": "PAN",
        "Papua New Guinea": "PNG",
        "Paraguay": "PRY",
        "Peru": "PER",
        "Philippines": "PHL",
        "Poland": "POL",
        "Portugal": "PRT",
        "Qatar": "QAT",
        "Romania": "ROU",
        "Russia": "RUS",
        "Rwanda": "RWA",
        "Saint Kitts and Nevis": "KNA",
        "Saint Lucia": "LCA",
        "Saint Vincent and the Grenadines": "VCT",
        "Samoa": "WSM",
        "San Marino": "SMR",
        "Sao Tome and Principe": "STP",
        "Saudi Arabia": "SAU",
        "Senegal": "SEN",
        "Serbia": "SRB",
        "Seychelles": "SYC",
        "Sierra Leone": "SLE",
        "Singapore": "SGP",
        "Slovakia": "SVK",
        "Slovenia": "SVN",
        "Solomon Islands": "SLB",
        "Somalia": "SOM",
        "South Africa": "ZAF",
        "South Sudan": "SSD",
        "Spain": "ESP",
        "Sri Lanka": "LKA",
        "Sudan": "SDN",
        "Suriname": "SUR",
        "Sweden": "SWE",
        "Switzerland": "CHE",
        "Syria": "SYR",
        "Taiwan": "TWN",
        "Tajikistan": "TJK",
        "Tanzania": "TZA",
        "Thailand": "THA",
        "Togo": "TGO",
        "Tonga": "TON",
        "Trinidad and Tobago": "TTO",
        "Tunisia": "TUN",
        "Turkey": "TUR",
        "Turkmenistan": "TKM",
        "Tuvalu": "TUV",
        "Uganda": "UGA",
        "Ukraine": "UKR",
        "United Arab Emirates": "ARE",
        "United Kingdom": "GBR",
        "United States": "USA",
        "Uruguay": "URY",
        "Uzbekistan": "UZB",
        "Vanuatu": "VUT",
        "Vatican City": "VAT",
        "Venezuela": "VEN",
        "Vietnam": "VNM",
        "Yemen": "YEM",
        "Zambia": "ZMB",
        "Zimbabwe": "ZWE"
    }

    // Sorting functions
  const sortById = () => {
    const newSortDirection = idSortDirection === 'asc' ? 'desc' : 'asc';
    setIdSortDirection(newSortDirection);
    const sortedData = [...data].sort((a, b) => {
      if (newSortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setFilteredData(sortedData);
  }; 
  
  const sortByAge = () => {
    const newSortDirection = idSortDirection === 'asc' ? 'desc' : 'asc';
    setIdSortDirection(newSortDirection);
    const sortedData = [...data].sort((a, b) => {
      if (newSortDirection === 'asc') {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    });
    setFilteredData(sortedData);
  }; 

  const sortByName = () => {
    const newSortDirection = nameSortDirection === 'asc' ? 'desc' : 'asc';
    setNameSortDirection(newSortDirection);
    const sortedData = [...data].sort((a, b) => {
      const nameA = `${a.firstName+" "} ${a.maidenName ? a.maidenName + ' ' : ''}${a.lastName}`;
      const nameB = `${b.firstName+" "} ${b.maidenName ? b.maidenName + ' ' : ''}${b.lastName}`;
      if (newSortDirection === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setFilteredData(sortedData);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  if(isLoading){
    return  <div className="flex items-center justify-center h-screen">
              <div className="relative">
                  <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                  <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                  </div>
              </div>
            </div>
  }

  return (
    <div className='m-5 mt-10' style={{ height: '450px', overflowY: 'scroll' }} ref={tableBodyRef}>
      {error && <div className="text-red-500">{error}</div>}
      <div className="mb-4 flex absolute right-9 top-10 ">
        <label htmlFor="country-filter" className="mr-2 pt-1"><HiFilter className='text-[#B5322A] size-5'/></label>
        <select id="country-filter" className='border-2 w-28' value={selectedCountry} onChange={handleCountryChange}>
          <option value="All">Country</option>
          {Object.keys(CountryNameMapping).map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <select id="gender-filter" className='border-2 ml-4 w-28' value={selectedGender} onChange={handleGenderChange}>
          <option value="gender">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
      </div>
      <div className='mt-4'>
        <table className='w-full h-96'>
          <thead className='w-full h-10 '>
            <tr className='sticky top-[-1px] bg-gray-300'>
              <th className='relative id w-20'>
                ID
                <button className='flex ml-1 absolute right-[-20px] top-3 px-3' onClick={sortById}>
                  <FaArrowUp className={` ${idSortDirection === 'asc' ? 'text-[#B5322A]' : 'text-gray-500'}`} />
                  <FaArrowDown className={` ${idSortDirection === 'desc' ? 'text-[#B5322A]' : 'text-gray-500'}`} />
                </button>
              </th>
              <th className='pb-2'>Image</th>
              <th className='relative'>
                Full Name
                <button className='flex ml-1 absolute top-3 right-16' onClick={sortByName}>
                  <FaArrowUp className={` ${nameSortDirection === 'asc' ? 'text-[#B5322A]' : 'text-gray-500'}`} />
                  <FaArrowDown className={` ${nameSortDirection === 'desc' ? 'text-[#B5322A]' : 'text-gray-500'}`} />
                </button>
              </th>
              <th className='relative'>
                Demography 
                  <button className='flex ml-1 absolute top-3 right-0' onClick={sortByAge}>
                    <FaArrowUp className={` ${idSortDirection === 'asc' ? 'text-[#B5322A]' : 'text-gray-500'}`} />
                    <FaArrowDown className={` ${idSortDirection === 'desc' ? 'text-[#B5322A]' : 'text-gray-500'}`} />
                  </button>
              </th>
              <th>Designation</th>
              <th className='location'>Location</th>
            </tr>
          </thead>
          <tbody className='w-full overflow'>
            {filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.id < 10 ? `0${item.id}` : item.id}</td>
                <td className='grid place-items-center'>
                  <img src={item.image} alt="" width={40} height={40} />
                </td>
                <td>
                  {item.firstName}&nbsp;
                  {item.maidenName && <span>{item.maidenName}&nbsp;</span>}
                  {item.lastName}
                </td>
                <td>{item.gender === 'male' ? 'M' : 'F'}/{item.age}</td>
                <td>{item.company.title}</td>
                <td>{item.address.state}, {CountryNameMapping[item.address.country]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
