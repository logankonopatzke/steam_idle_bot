# Steam Idle Bot [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/) [![ForTheBadge built-with-science](http://ForTheBadge.com/images/badges/built-with-science.svg)](https://GitHub.com/Naereen/) [![ForTheBadge powered-by-electricity](http://ForTheBadge.com/images/badges/powered-by-electricity.svg)](http://ForTheBadge.com)

A simple and easy to use steam game idling bot.

### Known Bugs

* Sometimes steam can lose connection and cause the web session event handlers to stack up, ultimately leaking the handler and causing a crash
* (It is likely that this occurs on regular steam maintenance time)

### Features

<details>

* **Idle up to 33 games at once**
* **Automatically start idling when not ingame**
* **Edit necessary settings via a config file**
* **Clean and compact code**
* **Fairly robust and capable of handling API errors**

</details>

### Usage
1. Add your account(s) information and desired apps into the config file
2. Start the script using a script manager
3. Allow a few minutes for your accounts to start idling

### Note
* The script will automatically exit after 10 hours and must be restarted by a script manager. I would personally recommend using either pm2 or forever.