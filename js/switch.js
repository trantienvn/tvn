const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
const theme = document.querySelector("#app");
const vendor = document.querySelector("#vendor");
if (currentTheme)
{
    //document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark')
	{
		theme.href = "/css/app_dark.css";
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked)
	{
        //document.documentElement.setAttribute('data-theme', 'dark');
		theme.href = "/css/app_dark.css";
		vendor.href = "/css/vendor_dark.css";
        localStorage.setItem('theme', 'dark');
    }
    else
	{        //document.documentElement.setAttribute('data-theme', 'light');
	    theme.href = "/css/app.css";
		vendor.href = "/css/vendor.css";
		localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
