const argEnvIndex = process.argv.indexOf("--env");
let argEnv = (argEnvIndex !== -1 && process.argv[argEnvIndex + 1]) || "";

const RUN_ENV_MAP = {
  local: {
    instances: 1,
    max_memory_restart: "250M",
  },
  dev: {
    instances: 1,
    max_memory_restart: "250M",
  },
  prod: {
    instances: 1,
    max_memory_restart: "500M",
  },
};

if (!(argEnv in RUN_ENV_MAP)) {
  argEnv = "prod";
}

module.exports = {
  apps: [
    {
      name: "edugate",
      script: "./edugate.js",
      instances: RUN_ENV_MAP[argEnv].instances,
      max_memory_restart: RUN_ENV_MAP[argEnv].max_memory_restart,
      exec_mode: "cluster",

      // Startup configuration
      wait_ready: true, // Wait for process.send('ready')
      listen_timeout: 10000, // 10s to start listening
      min_uptime: 10000, // Min 10s uptime to consider successful start

      // Shutdown configuration
      kill_timeout: 35000, // 35s = 30s graceful shutdown + 5s buffer
      shutdown_with_message: true, // Send shutdown message before SIGINT

      // Restart configuration
      autorestart: true,
      max_restarts: 10,
      restart_delay: 4000, // Wait 4s before restart

      // Health checks (PM2 Plus feature, optional)
      // health_check: {
      //   path: "/health",
      //   interval: 30000,
      //   timeout: 5000,
      // },

      // Logging
      watch: false,
      out_file: "./logger/out.log",
      error_file: "./logger/error.log",
      merge_logs: true,
      log_date_format: "DD-MM HH:mm:ss Z",
      log_type: "json",

      // Environment variables
      env_local: {
        APP_ENV: "local",
        NODE_ENV: "development",
      },
      env_dev: {
        APP_ENV: "dev",
        NODE_ENV: "development",
      },
      env_prod: {
        APP_ENV: "prod",
        NODE_ENV: "production",
      },
    },
  ],
};
