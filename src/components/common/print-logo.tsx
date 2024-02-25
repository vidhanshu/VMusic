"use client";

import { useEffect, useRef } from "react";
import chalk from "chalk";

const PrintLogo = () => {
  const printedOnceRef = useRef(false);

  useEffect(() => {
    if (!printedOnceRef.current) {
      console.log(chalk.green("Welcome to the Vmusic!"));
      console.log("")
      console.log(chalk.blue("                    ***"));
      console.log(chalk.blue(" ***               *****"));
      console.log(chalk.blue("  ***     ***     *** ***"));
      console.log(chalk.blue("   ***   *****   ***   ***"));
      console.log(chalk.blue("    *** *** *** ***     ***"));
      console.log(chalk.blue("     ******   ***        ***"));
      console.log(chalk.blue("      ***                 ***"));
      printedOnceRef.current = true;
    }
  }, []);
  return null;
};

export default PrintLogo;
