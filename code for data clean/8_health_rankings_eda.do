clear
local main "/Users/angelawang/Desktop/CIS550/Final_Project/Health"
local input "`main'/input"
local output "`main'/output"
insheet using "`input'/2021 County Health Rankings.csv"

tostring fips, replace
gen fips_temp = fips
assert strlen(trim(fips_temp))>=4
replace fips = "0"+fips_temp if strlen(trim(fips_temp))==4
assert strlen(trim(fips))==5 
drop fips_temp
count if mi(county)
drop if mi(county)
local varlist "health_outcomes_rank health_factors_rank"
foreach var of local varlist{
	count if `var'=="NR" | mi(`var')
	drop if `var'=="NR" | mi(`var')
	destring `var', replace
}
save "`output'/county_health_rankings", replace


insheet using "`input'/2021 County Health SubRankings.csv", clear
tostring fips, replace
gen fips_temp = fips
assert strlen(trim(fips_temp))>=4
replace fips = "0"+fips_temp if strlen(trim(fips_temp))==4
assert strlen(trim(fips))==5 
drop fips_temp
count if mi(county)
drop if mi(county)

local varlist "length_of_life_rank quality_of_life_rank health_behaviors_rank clinical_care_rank social_and_economic_factors_rank physical_environment_rank"
foreach var of local varlist{
	count if `var'=="NR" | mi(`var')
	drop if `var'=="NR" | mi(`var')
	destring `var', replace
}
save "`output'/county_health_subrankings", replace
merge 1:1 fips using "`output'/county_health_rankings"
drop _merge
save "`output'/county_health_allrankings", replace
outsheet using `output'/county_health_allrankings.csv, comma replace

insheet using "/Users/angelawang/Desktop/CIS550/Final_Project/Health/input/ZIP_COUNTY_122021.csv", clear

keep zip county usps_zip_pref_city usps_zip_pref_state tot_ratio
rename usps_zip_pref_city city 
rename usps_zip_pref_state state
rename county fips
order zip state city fips

tostring fips, replace
gen fips_temp = fips
assert strlen(trim(fips_temp))>=4
replace fips = "0"+fips_temp if strlen(trim(fips_temp))==4
assert strlen(trim(fips))==5 
drop fips_temp

tostring zip, replace
gen zip_temp = zip
assert strlen(zip_temp)>=3
replace zip = "0"+zip_temp if strlen(trim(zip_temp))==4
replace zip = "00"+zip_temp if strlen(trim(zip_temp))==3
assert strlen(zip)==5
drop zip_temp

bys zip city state (tot_ratio): gen dup = _N
by zip city state (tot_ratio): keep if _n==_N
drop dup tot_ratio

isid zip city state

merge m:1 fips using "`output'/county_health_allrankings", keepus(fips)
keep if _merge==3
drop _merge
codebook
count

save "`output'/zip_city_state_county_crosswalk", replace
outsheet using `output'/zip_city_state_county_crosswalk.csv, comma replace

