## 通过代理连接国外ipv6时遇到的问题

PS C:\Users\akyna> ssh s2
kex_exchange_identification: Connection closed by remote host
Connection closed by UNKNOWN port 65535

切换代理节点，解决了该问题。

部分节点可以，部分节点不可以？？？

---

失败时debug情况：

```
PS C:\Users\akyna> ssh -vvv6 s2
OpenSSH_for_Windows_8.6p1, LibreSSL 3.4.3
debug1: Reading configuration data C:\\Users\\akyna/.ssh/config
debug1: C:\\Users\\akyna/.ssh/config line 10: Applying options for s2
debug3: Failed to open file:C:/ProgramData/ssh/ssh_config error:2
debug2: resolve_canonicalize: hostname 2a01:4f8:13b:2b03:2018:2019::77 is address
debug2: resolve_canonicalize: canonicalised address "2a01:4f8:13b:2b03:2018:2019::77" => "2a01:4f8:13b:2b03:2018:2019:0:77"
debug3: expanded UserKnownHostsFile '~/.ssh/known_hosts' -> 'C:\\Users\\akyna/.ssh/known_hosts'
debug3: expanded UserKnownHostsFile '~/.ssh/known_hosts2' -> 'C:\\Users\\akyna/.ssh/known_hosts2'
debug1: Authenticator provider $SSH_SK_PROVIDER did not resolve; disabling
debug1: Executing proxy command: exec "C:\\Program Files\\Git\\mingw64\\bin\\connect.exe" -S 127.0.0.1:7890 -a none 2a01:4f8:13b:2b03:2018:2019:0:77 22
debug3: spawning "C:\\Program Files\\Git\\mingw64\\bin\\connect.exe" -S 127.0.0.1:7890 -a none 2a01:4f8:13b:2b03:2018:2019:0:77 22 as subprocess
debug3: w32_getpeername ERROR: not sock :2
debug1: identity file C:\\Users\\akyna/.ssh/id_rsa type 0
debug3: Failed to open file:C:/Users/akyna/.ssh/id_rsa-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_rsa-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_rsa-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_rsa-cert type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_dsa error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_dsa.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_dsa error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_dsa type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_dsa-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_dsa-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_dsa-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_dsa-cert type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ecdsa error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ecdsa type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ecdsa-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ecdsa-cert type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa_sk error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa_sk.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ecdsa_sk error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ecdsa_sk type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa_sk-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa_sk-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ecdsa_sk-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ecdsa_sk-cert type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519 error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ed25519 error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ed25519 type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ed25519-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ed25519-cert type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519_sk error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519_sk.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ed25519_sk error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ed25519_sk type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519_sk-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519_sk-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ed25519_sk-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ed25519_sk-cert type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_xmss error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_xmss.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_xmss error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_xmss type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_xmss-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_xmss-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_xmss-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_xmss-cert type -1
debug1: Local version string SSH-2.0-OpenSSH_for_Windows_8.6
kex_exchange_identification: Connection closed by remote host
Connection closed by UNKNOWN port 65535
```

成功时debug情况：

```
PS C:\Users\akyna> ssh -vvv6 s2
OpenSSH_for_Windows_8.6p1, LibreSSL 3.4.3
debug1: Reading configuration data C:\\Users\\akyna/.ssh/config
debug1: C:\\Users\\akyna/.ssh/config line 10: Applying options for s2
debug3: Failed to open file:C:/ProgramData/ssh/ssh_config error:2
debug2: resolve_canonicalize: hostname 2a01:4f8:13b:2b03:2018:2019::77 is address
debug2: resolve_canonicalize: canonicalised address "2a01:4f8:13b:2b03:2018:2019::77" => "2a01:4f8:13b:2b03:2018:2019:0:77"
debug3: expanded UserKnownHostsFile '~/.ssh/known_hosts' -> 'C:\\Users\\akyna/.ssh/known_hosts'
debug3: expanded UserKnownHostsFile '~/.ssh/known_hosts2' -> 'C:\\Users\\akyna/.ssh/known_hosts2'
debug1: Authenticator provider $SSH_SK_PROVIDER did not resolve; disabling
debug1: Executing proxy command: exec "C:\\Program Files\\Git\\mingw64\\bin\\connect.exe" -S 127.0.0.1:7890 -a none 2a01:4f8:13b:2b03:2018:2019:0:77 22
debug3: spawning "C:\\Program Files\\Git\\mingw64\\bin\\connect.exe" -S 127.0.0.1:7890 -a none 2a01:4f8:13b:2b03:2018:2019:0:77 22 as subprocess
debug3: w32_getpeername ERROR: not sock :2
debug1: identity file C:\\Users\\akyna/.ssh/id_rsa type 0
debug3: Failed to open file:C:/Users/akyna/.ssh/id_rsa-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_rsa-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_rsa-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_rsa-cert type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_dsa error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_dsa.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_dsa error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_dsa type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_dsa-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_dsa-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_dsa-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_dsa-cert type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ecdsa error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ecdsa type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ecdsa-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ecdsa-cert type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa_sk error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa_sk.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ecdsa_sk error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ecdsa_sk type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa_sk-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ecdsa_sk-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ecdsa_sk-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ecdsa_sk-cert type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519 error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ed25519 error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ed25519 type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ed25519-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ed25519-cert type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519_sk error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519_sk.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ed25519_sk error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ed25519_sk type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519_sk-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_ed25519_sk-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_ed25519_sk-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_ed25519_sk-cert type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_xmss error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_xmss.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_xmss error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_xmss type -1
debug3: Failed to open file:C:/Users/akyna/.ssh/id_xmss-cert error:2
debug3: Failed to open file:C:/Users/akyna/.ssh/id_xmss-cert.pub error:2
debug3: failed to open file:C:/Users/akyna/.ssh/id_xmss-cert error:2
debug1: identity file C:\\Users\\akyna/.ssh/id_xmss-cert type -1
debug1: Local version string SSH-2.0-OpenSSH_for_Windows_8.6

########################### 开始发生改变的地方

debug1: Remote protocol version 2.0, remote software version OpenSSH_7.9p1 Debian-10+deb10u2
debug1: compat_banner: match: OpenSSH_7.9p1 Debian-10+deb10u2 pat OpenSSH* compat 0x04000000
debug2: fd 5 setting O_NONBLOCK
debug2: fd 4 setting O_NONBLOCK
debug1: Authenticating to 2a01:4f8:13b:2b03:2018:2019:0:77:22 as 'root'
debug3: record_hostkey: found key type ED25519 in file C:\\Users\\akyna/.ssh/known_hosts:7
debug3: record_hostkey: found key type RSA in file C:\\Users\\akyna/.ssh/known_hosts:8
debug3: record_hostkey: found key type ECDSA in file C:\\Users\\akyna/.ssh/known_hosts:9
debug3: load_hostkeys_file: loaded 3 keys from 2a01:4f8:13b:2b03:2018:2019:0:77
debug3: Failed to open file:C:/Users/akyna/.ssh/known_hosts2 error:2
debug1: load_hostkeys: fopen C:\\Users\\akyna/.ssh/known_hosts2: No such file or directory
debug3: Failed to open file:C:/ProgramData/ssh/ssh_known_hosts error:2
debug1: load_hostkeys: fopen __PROGRAMDATA__\\ssh/ssh_known_hosts: No such file or directory
debug3: Failed to open file:C:/ProgramData/ssh/ssh_known_hosts2 error:2
debug1: load_hostkeys: fopen __PROGRAMDATA__\\ssh/ssh_known_hosts2: No such file or directory
debug3: order_hostkeyalgs: have matching best-preference key type ssh-ed25519-cert-v01@openssh.com, using HostkeyAlgorithms verbatim
debug3: send packet: type 20
debug1: SSH2_MSG_KEXINIT sent
debug3: receive packet: type 20
debug1: SSH2_MSG_KEXINIT received
debug2: local client KEXINIT proposal
debug2: KEX algorithms: curve25519-sha256,curve25519-sha256@libssh.org,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group-exchange-sha256,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512,diffie-hellman-group14-sha256,ext-info-c
debug2: host key algorithms: ssh-ed25519-cert-v01@openssh.com,ecdsa-sha2-nistp256-cert-v01@openssh.com,ecdsa-sha2-nistp384-cert-v01@openssh.com,ecdsa-sha2-nistp521-cert-v01@openssh.com,sk-ssh-ed25519-cert-v01@openssh.com,sk-ecdsa-sha2-nistp256-cert-v01@openssh.com,rsa-sha2-512-cert-v01@openssh.com,rsa-sha2-256-cert-v01@openssh.com,ssh-rsa-cert-v01@openssh.com,ssh-ed25519,ecdsa-sha2-nistp256,ecdsa-sha2-nistp384,ecdsa-sha2-nistp521,sk-ssh-ed25519@openssh.com,sk-ecdsa-sha2-nistp256@openssh.com,rsa-sha2-512,rsa-sha2-256,ssh-rsa
debug2: ciphers ctos: chacha20-poly1305@openssh.com,aes128-ctr,aes192-ctr,aes256-ctr,aes128-gcm@openssh.com,aes256-gcm@openssh.com
debug2: ciphers stoc: chacha20-poly1305@openssh.com,aes128-ctr,aes192-ctr,aes256-ctr,aes128-gcm@openssh.com,aes256-gcm@openssh.com
debug2: MACs ctos: umac-64-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,hmac-sha1-etm@openssh.com,umac-64@openssh.com,umac-128@openssh.com,hmac-sha2-256,hmac-sha2-512,hmac-sha1
debug2: MACs stoc: umac-64-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,hmac-sha1-etm@openssh.com,umac-64@openssh.com,umac-128@openssh.com,hmac-sha2-256,hmac-sha2-512,hmac-sha1
debug2: compression ctos: none,zlib@openssh.com,zlib
debug2: compression stoc: none,zlib@openssh.com,zlib
debug2: languages ctos:
debug2: languages stoc:
debug2: first_kex_follows 0
debug2: reserved 0
debug2: peer server KEXINIT proposal
debug2: KEX algorithms: curve25519-sha256,curve25519-sha256@libssh.org,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group-exchange-sha256,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512,diffie-hellman-group14-sha256,diffie-hellman-group14-sha1
debug2: host key algorithms: rsa-sha2-512,rsa-sha2-256,ssh-rsa,ecdsa-sha2-nistp256,ssh-ed25519
debug2: ciphers ctos: chacha20-poly1305@openssh.com,aes128-ctr,aes192-ctr,aes256-ctr,aes128-gcm@openssh.com,aes256-gcm@openssh.com
debug2: ciphers stoc: chacha20-poly1305@openssh.com,aes128-ctr,aes192-ctr,aes256-ctr,aes128-gcm@openssh.com,aes256-gcm@openssh.com
debug2: MACs ctos: umac-64-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,hmac-sha1-etm@openssh.com,umac-64@openssh.com,umac-128@openssh.com,hmac-sha2-256,hmac-sha2-512,hmac-sha1
debug2: MACs stoc: umac-64-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,hmac-sha1-etm@openssh.com,umac-64@openssh.com,umac-128@openssh.com,hmac-sha2-256,hmac-sha2-512,hmac-sha1
debug2: compression ctos: none,zlib@openssh.com
debug2: compression stoc: none,zlib@openssh.com
debug2: languages ctos:
debug2: languages stoc:
debug2: first_kex_follows 0
debug2: reserved 0
debug1: kex: algorithm: curve25519-sha256
debug1: kex: host key algorithm: ssh-ed25519
debug1: kex: server->client cipher: chacha20-poly1305@openssh.com MAC: <implicit> compression: none
debug1: kex: client->server cipher: chacha20-poly1305@openssh.com MAC: <implicit> compression: none
debug3: send packet: type 30
debug1: expecting SSH2_MSG_KEX_ECDH_REPLY
debug3: receive packet: type 31
debug1: SSH2_MSG_KEX_ECDH_REPLY received
debug1: Server host key: ssh-ed25519 SHA256:XyHi8SRru8RB7DCt45KFMWYMRhe705ofAU0XAO3y8T0
debug3: record_hostkey: found key type ED25519 in file C:\\Users\\akyna/.ssh/known_hosts:7
debug3: record_hostkey: found key type RSA in file C:\\Users\\akyna/.ssh/known_hosts:8
debug3: record_hostkey: found key type ECDSA in file C:\\Users\\akyna/.ssh/known_hosts:9
debug3: load_hostkeys_file: loaded 3 keys from 2a01:4f8:13b:2b03:2018:2019:0:77
debug3: Failed to open file:C:/Users/akyna/.ssh/known_hosts2 error:2
debug1: load_hostkeys: fopen C:\\Users\\akyna/.ssh/known_hosts2: No such file or directory
debug3: Failed to open file:C:/ProgramData/ssh/ssh_known_hosts error:2
debug1: load_hostkeys: fopen __PROGRAMDATA__\\ssh/ssh_known_hosts: No such file or directory
debug3: Failed to open file:C:/ProgramData/ssh/ssh_known_hosts2 error:2
debug1: load_hostkeys: fopen __PROGRAMDATA__\\ssh/ssh_known_hosts2: No such file or directory
debug1: Host '2a01:4f8:13b:2b03:2018:2019:0:77' is known and matches the ED25519 host key.
debug1: Found key in C:\\Users\\akyna/.ssh/known_hosts:7
debug3: send packet: type 21
debug2: set_newkeys: mode 1
debug1: rekey out after 134217728 blocks
debug1: SSH2_MSG_NEWKEYS sent
debug1: expecting SSH2_MSG_NEWKEYS
debug3: receive packet: type 21
debug1: SSH2_MSG_NEWKEYS received
debug2: set_newkeys: mode 0
debug1: rekey in after 134217728 blocks
debug3: unable to connect to pipe \\\\.\\pipe\\openssh-ssh-agent, error: 2
debug1: pubkey_prepare: ssh_get_authentication_socket: No such file or directory
debug1: Will attempt key: C:\\Users\\akyna/.ssh/id_rsa RSA SHA256:WSTRTb0wQdqHwsaLGuQ8IvAI5uCfu3rwbXj9HCJpKBo
debug1: Will attempt key: C:\\Users\\akyna/.ssh/id_dsa
debug1: Will attempt key: C:\\Users\\akyna/.ssh/id_ecdsa
debug1: Will attempt key: C:\\Users\\akyna/.ssh/id_ecdsa_sk
debug1: Will attempt key: C:\\Users\\akyna/.ssh/id_ed25519
debug1: Will attempt key: C:\\Users\\akyna/.ssh/id_ed25519_sk
debug1: Will attempt key: C:\\Users\\akyna/.ssh/id_xmss
debug2: pubkey_prepare: done
debug3: send packet: type 5
debug3: receive packet: type 7
debug1: SSH2_MSG_EXT_INFO received
debug1: kex_input_ext_info: server-sig-algs=<ssh-ed25519,ssh-rsa,rsa-sha2-256,rsa-sha2-512,ssh-dss,ecdsa-sha2-nistp256,ecdsa-sha2-nistp384,ecdsa-sha2-nistp521>
debug3: receive packet: type 6
debug2: service_accept: ssh-userauth
debug1: SSH2_MSG_SERVICE_ACCEPT received
debug3: send packet: type 50
debug3: receive packet: type 51
debug1: Authentications that can continue: publickey,password
debug3: start over, passed a different list publickey,password
debug3: preferred publickey,keyboard-interactive,password
debug3: authmethod_lookup publickey
debug3: remaining preferred: keyboard-interactive,password
debug3: authmethod_is_enabled publickey
debug1: Next authentication method: publickey
debug1: Offering public key: C:\\Users\\akyna/.ssh/id_rsa RSA SHA256:WSTRTb0wQdqHwsaLGuQ8IvAI5uCfu3rwbXj9HCJpKBo
debug3: send packet: type 50
debug2: we sent a publickey packet, wait for reply
debug3: receive packet: type 60
debug1: Server accepts key: C:\\Users\\akyna/.ssh/id_rsa RSA SHA256:WSTRTb0wQdqHwsaLGuQ8IvAI5uCfu3rwbXj9HCJpKBo
debug3: sign_and_send_pubkey: RSA SHA256:WSTRTb0wQdqHwsaLGuQ8IvAI5uCfu3rwbXj9HCJpKBo
debug3: sign_and_send_pubkey: signing using rsa-sha2-512 SHA256:WSTRTb0wQdqHwsaLGuQ8IvAI5uCfu3rwbXj9HCJpKBo
debug3: send packet: type 50
debug3: receive packet: type 52
debug1: Authentication succeeded (publickey).
debug3: w32_getpeername ERROR: not sock :2
Authenticated to 2a01:4f8:13b:2b03:2018:2019:0:77 (via proxy).
debug1: channel 0: new [client-session]
debug3: ssh_session2_open: channel_new: 0
debug2: channel 0: send open
debug3: send packet: type 90
debug1: Requesting no-more-sessions@openssh.com
debug3: send packet: type 80
debug1: Entering interactive session.
debug1: pledge: filesystem full
debug1: ENABLE_VIRTUAL_TERMINAL_INPUT is supported. Reading the VTSequence from console
debug3: This windows OS supports conpty
debug1: ENABLE_VIRTUAL_TERMINAL_PROCESSING is supported. Console supports the ansi parsing
debug3: Successfully set console output code page from:65001 to 65001
debug3: Successfully set console input code page from:65001 to 65001
debug3: receive packet: type 80
debug1: client_input_global_request: rtype hostkeys-00@openssh.com want_reply 0
debug3: client_input_hostkeys: received RSA key SHA256:t2np7qyFZrs+3UbOdct3+NQp4LPGWljkDq41wNIcSLk
debug3: client_input_hostkeys: received ECDSA key SHA256:UMclrZc4ucgyzYKjyczrbbj/36mnAsOdZ/L8k99gd20
debug3: client_input_hostkeys: received ED25519 key SHA256:XyHi8SRru8RB7DCt45KFMWYMRhe705ofAU0XAO3y8T0
debug1: client_input_hostkeys: searching C:\\Users\\akyna/.ssh/known_hosts for 2a01:4f8:13b:2b03:2018:2019:0:77 / (none)
debug3: hostkeys_foreach: reading file "C:\\Users\\akyna/.ssh/known_hosts"
debug3: hostkeys_find: found ssh-ed25519 key at C:\\Users\\akyna/.ssh/known_hosts:7
debug3: hostkeys_find: found ssh-rsa key at C:\\Users\\akyna/.ssh/known_hosts:8
debug3: hostkeys_find: found ecdsa-sha2-nistp256 key at C:\\Users\\akyna/.ssh/known_hosts:9
debug1: client_input_hostkeys: searching C:\\Users\\akyna/.ssh/known_hosts2 for 2a01:4f8:13b:2b03:2018:2019:0:77 / (none)
debug3: Failed to open file:C:/Users/akyna/.ssh/known_hosts2 error:2
debug1: client_input_hostkeys: hostkeys file C:\\Users\\akyna/.ssh/known_hosts2 does not exist
debug3: client_input_hostkeys: 3 server keys: 0 new, 3 retained, 0 incomplete match. 0 to remove
debug1: client_input_hostkeys: no new or deprecated keys from server
debug3: receive packet: type 4
debug1: Remote: /root/.ssh/authorized_keys:2: key options: agent-forwarding port-forwarding pty user-rc x11-forwarding
debug3: receive packet: type 4
debug1: Remote: /root/.ssh/authorized_keys:2: key options: agent-forwarding port-forwarding pty user-rc x11-forwarding
debug3: receive packet: type 91
debug2: channel_input_open_confirmation: channel 0: callback start
debug3: w32_getpeername ERROR: not sock :2
debug2: client_session2_setup: id 0
debug2: channel 0: request pty-req confirm 1
debug3: send packet: type 98
debug2: channel 0: request shell confirm 1
debug3: send packet: type 98
debug2: channel_input_open_confirmation: channel 0: callback done
debug2: channel 0: open confirm rwindow 0 rmax 32768
debug3: receive packet: type 99
debug2: channel_input_status_confirm: type 99 id 0
debug2: PTY allocation request accepted on channel 0
debug2: channel 0: rcvd adjust 2097152
debug3: receive packet: type 99
debug2: channel_input_status_confirm: type 99 id 0
debug2: shell request accepted on channel 0
Linux OranMe2474 5.4.143-1-pve #1 SMP PVE 5.4.143-1 (Tue, 28 Sep 2021 09:10:37 +0200) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
You have new mail.
Last login: Thu Jan  5 15:10:43 2023 from 2a0d:5600:e::e269:9b74
root@OranMe2474:~#

```

## Teredo配置问题

解决方法：

```
# 查看Teredo配置情况
netsh interface Teredo show state
# 配置Teredo
netsh interface Teredo set state enterpriseclient server=default
```

注：如果连了路由器，路由器需要支持NAT转换：

>Teredo是一个IPv6转换机制，它可为运行在IPv4互联网但没有IPv6网络原生连接的支持IPv6的主机提供完全的连通性。与其他的类似协议不同，它可以在网络地址转换（NAT）设备（例如家庭路由器）后完成功能。

成功时的结果：

```
PS C:\Users\akyna> netsh interface Teredo show state
Teredo Parameters
---------------------------------------------
Type                    : enterpriseclient
Server Name             : win1910.ipv6.microsoft.com.
Client Refresh Interval : 60 seconds
Client Port             : 34567
State                   : qualified
Client Type             : teredo client
Network                 : managed
NAT                     : restricted (port)
NAT Special Behaviour   : UPNP: Yes, PortPreserving: No
Local Mapping           : 192.168.3.6:34567
External NAT Mapping    : 113.117.60.37:18778
```

如果还是不成功，Type还是disabled状态：

？？？？ 