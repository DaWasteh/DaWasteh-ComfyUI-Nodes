# Live Avatar VRM preset provenance

The preset manifest is the authority: `assets/live-avatar-vrm/model-manifest.json`. Its HTTPS-only URLs, exact byte sizes and SHA-256 checks are verified before installation. The source collection is Open Source Avatars / Polygonal Mind, whose listed assets are CC0; the manifest preserves attribution as provenance even though CC0 does not require it.

| Preset | Source / licence | Content description |
|---|---|---|
| Amazonas | Polygonal Mind, CC0-1.0 | Lightly clothed fantasy female avatar; not a real person. |
| Olivia | Polygonal Mind, CC0-1.0 | Lightly clothed fantasy female avatar; not a real person. |
| Lady Koi | Open Source Avatars, CC0-1.0 | Unclothed but non-explicit **nonhuman fantasy** female character. It is not labelled as an adult human and no human age is asserted. |
| Panda Bear | CC0 Teddy by Polygonal Mind, deterministic local texture derivative | Panda-like anime bear; no TeddyLong-Panda asset is downloaded or included. |

The installer rejects non-HTTPS/non-allowlisted URLs, unsafe filenames, wrong size/hash, malformed GLB/VRM data and files larger than 32 MiB. It does not accept a user-supplied URL. Models are deliberately not committed to Git.
