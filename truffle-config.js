module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*"
        }
    },
    contracts_directory: "./src/ethereum/contracts",
    contracts_build_directory: "./src/ethereum/abis",
    migrations_directory: "./src/ethereum/migrations",
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
