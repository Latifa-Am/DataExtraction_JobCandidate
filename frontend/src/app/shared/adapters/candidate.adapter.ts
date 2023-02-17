import { Injectable } from "@angular/core";
import { Candidate } from "../models/Candidate.model";
import { Adapter } from "./adapter";

@Injectable({
  providedIn: "root",
})
export class CandidateAdapter implements Adapter<Candidate> {
  adapt(item: any): Candidate {
    return new Candidate(item.firstName, item.lastName, item.email, item.description);
  }
}