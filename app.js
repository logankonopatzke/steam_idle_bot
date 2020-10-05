// Created by Logan Konopatzke

var SteamUser = require("steam-user");
var SteamTotp = require("steam-totp");

const Config = require("./config.json");

function SetupAccount(index) {
	console.log("[+] Preparing account " + (index + 1) + " (" + Config.Accounts[index].Username + ") to idle");

	var Log = (message) => {
		console.log(message + " [Account " + (index + 1) + " (" + Config.Accounts[index].Username + ")]");
	};

	var Client = new SteamUser();
	Client.on('error', function (error) {
		if (error.eresult === 6) {
			Log("[+] User bypassed idler, logging off");
			Client.logOff();
			setTimeout(Login, Config.Accounts[index].TimeoutInSeconds * 1000);
		}
		else
			Log("[-] Steam threw error code " + error.eresult);
	});

	Client.on('playingState', function (bIsInGame) {
		if (bIsInGame)
			Log("[+] User in game already");
		else {
			Log("[+] User not in game, starting to idle...");
			Client.setPersona(SteamUser.Offline);
			Client.gamesPlayed(Config.Accounts[index].AppIDList);
		}
	});

	Client.on('disconnected', function (eresult) {
		if (eresult == 0)
			Log("[+] Logged off, will reconnect in " + Config.Accounts[index].TimeoutInSeconds + " seconds");
		else {
			Log("[-] Disconnected for " + eresult);
			process.exit(1);
		}
	});

	Client.on('loggedOn', function (details) {
		Log("[+] Logged onto the steam network");
		Client.on('webSession', function (sessionID, cookies) {
			Log("[+] Got web session")
			Client.setPersona(SteamUser.Offline);
			Client.gamesPlayed(Config.Accounts[index].AppIDList);
		});
	});

	Client.on('steamGuard', function (domain, callback) {
		callback(SteamTotp.generateAuthCode(Config.Accounts[index].SharedSecret));
	});

	Log("[+] Attempting to log in to steam");
	Client.logOn({
		accountName: Config.Accounts[index].Username,
		password: Config.Accounts[index].Password
	});
	Log("[+] Waiting for steam response...");
}

const SetupCooldown = 600; // 5 minutes

function SetupAccounts() {
	console.log("[+] Setting up " + Config.Accounts.length + " accounts to idle");
	for (var i = 0; i < Config.Accounts.length; i++) {
		var Timeout = i * SetupCooldown;
		console.log("[+] Waiting " + Timeout + " seconds to start account " + (i + 1));
		setTimeout(SetupAccount.bind(null, i), Timeout * 1000);
	}
}

function Quit() {
	console.log("[+] Quitting to refresh app");
	process.exit(0);
}

SetupAccounts();

setTimeout(Quit, 36000 * 1000); // 10 hours