/**
 * Package badges module.
 */
import { buildUrl, genericBadge, logoParams } from "./badges";
import { PACKAGE_INFO } from "./constants";

// This may not be so useful. 'depenency: foo' instead of 'npm: foo'? With Node.js logo?
// TODO: alt styles:
//      - 'react : 1.2.3'
//      - Get dynamically from package.json
//      - 'dependency: react'
// TODO add logo for Python etc.
export class Package {
  constructor(name, type) {
    this.name = name;
    this.type = type;

    this.color = "blue";
    this.isLarge = false;

    this.metadata = PACKAGE_INFO[type];
    if (!this.metadata) {
      throw new Error("Unable to find matching provider");
    }
  }

  badge() {
    return genericBadge(
      this.metadata.label,
      this.name,
      this.color,
      this.isLarge,
      this.metadata.url
    );
  }
}

export function versionBadge(
  username,
  repoName,
  pkgName,
  pkgType,
  logo = "",
  logoColor = ""
) {
  if (!username || !repoName || !pkgName || !pkgType) {
    return "";
  }

  if (pkgType === "node") {
    const url = `https://img.shields.io/github/package-json/dependency-version/${username}/${repoName}/${pkgName}`,
      params = logoParams(false, logo, logoColor),
      imgUrl = buildUrl(url, params);

    return `![Package - ${pkgName}](${imgUrl})`;
  }

  return "";
}
