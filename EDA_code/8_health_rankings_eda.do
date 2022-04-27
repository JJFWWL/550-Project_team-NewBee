//define the folder paths
clear
local main "/Users/angelawang/Desktop/CIS550/Final_Project/Health"
local input "`main'/input"
local output "`main'/output"

//read in the county health rankings data
insheet using "`input'/2021 County Health Rankings.csv"
//get brief summary about the data
codebook
//the fips variable should be a 5-digit string with padded zeros
//reformat the fips variable to add back the padded zeros
tostring fips, replace
gen fips_temp = fips
assert strlen(trim(fips_temp))>=4
replace fips = "0"+fips_temp if strlen(trim(fips_temp))==4
assert strlen(trim(fips))==5 
drop fips_temp
//deal with the missing and invalid values
count if mi(county)
drop if mi(county)
local varlist "health_outcomes_rank health_factors_rank"
foreach var of local varlist{
	count if `var'=="NR" | mi(`var')
	drop if `var'=="NR" | mi(`var')
	destring `var', replace
}
//get brief summary about the cleaned data
codebook
//save the result file
save "`output'/county_health_rankings", replace

//read in the county health subrankings data
insheet using "`input'/2021 County Health SubRankings.csv", clear
//get brief summary about the data
codebook
//the fips variable should be a 5-digit string with padded zeros
//reformat the fips variable to add back the padded zeros
tostring fips, replace
gen fips_temp = fips
assert strlen(trim(fips_temp))>=4
replace fips = "0"+fips_temp if strlen(trim(fips_temp))==4
assert strlen(trim(fips))==5 
drop fips_temp
//deal with the missing and invalid values
count if mi(county)
drop if mi(county)
local varlist "length_of_life_rank quality_of_life_rank health_behaviors_rank clinical_care_rank social_and_economic_factors_rank physical_environment_rank"
foreach var of local varlist{
	count if `var'=="NR" | mi(`var')
	drop if `var'=="NR" | mi(`var')
	destring `var', replace
}
//get brief summary about the cleaned data
codebook
//save the result file
save "`output'/county_health_subrankings", replace
merge 1:1 fips using "`output'/county_health_rankings"
//drop the extra attributes
drop _merge number_of_ranked_counties 
//the two files can be merged and still meet the 3NF criteria
save "`output'/county_health_allrankings", replace
//export the csv file
outsheet using `output'/county_health_allrankings.csv, comma replace

//read in the zip to county crosswalk data
insheet using "/Users/angelawang/Desktop/CIS550/Final_Project/Health/input/ZIP_COUNTY_122021.csv", clear
//get brief summary about the cleaned data
codebook
//only keep useful variables
keep zip county usps_zip_pref_city usps_zip_pref_state tot_ratio
rename usps_zip_pref_city city 
rename usps_zip_pref_state state
rename county fips
order zip state city fips
//the fips variable should be a 5-digit string with padded zeros
//reformat the fips variable to add back the padded zeros
tostring fips, replace
gen fips_temp = fips
assert strlen(trim(fips_temp))>=4
replace fips = "0"+fips_temp if strlen(trim(fips_temp))==4
assert strlen(trim(fips))==5 
drop fips_temp
//the zip variable should be a 5-digit string with padded zeros
//reformat the fips variable to add back the padded zeros
tostring zip, replace
gen zip_temp = zip
assert strlen(zip_temp)>=3
replace zip = "0"+zip_temp if strlen(trim(zip_temp))==4
replace zip = "00"+zip_temp if strlen(trim(zip_temp))==3
assert strlen(zip)==5
drop zip_temp
//if a zip city state have more than one fips mapped, we do the imputation using the fips that has
//the higher proportion of total population
bys zip city state (tot_ratio): gen dup = _N
by zip city state (tot_ratio): keep if _n==_N
drop dup tot_ratio
//order the variables
isid zip city state
//only subset to the fips in the county health rankings dataset
merge m:1 fips using "`output'/county_health_allrankings", keepus(fips)
keep if _merge==3
drop _merge
//get summary about the cleaned data
codebook
count
//save the result file
save "`output'/zip_city_state_county_crosswalk", replace
//export the csv file
outsheet using `output'/zip_city_state_county_crosswalk.csv, comma replace

